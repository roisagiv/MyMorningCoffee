import { flow, getEnv, types } from "mobx-state-tree";
import moment from "moment";
import {
  IHackerNewsService,
  IHackerNewsStory
} from "../Services/HackerNewsService";
import INewsAPIService, {
  ITopHeadlinesResponse
} from "../Services/NewsAPIService";
import IScrapingService, { IScrapeResponse } from "../Services/ScrapingService";
import IURLHashService from "../Services/URLHashService";
import { INewsItem, NewsItemModel, NewsItemModelState } from "./NewsItem";

export const NewsStore = types
  .model({
    error: types.maybe(types.string),
    items: types.optional(types.map(NewsItemModel), {}),
    loading: types.optional(types.boolean, false),
    updatedAt: types.maybe(types.Date)
  })
  .views(self => ({
    get hackerNewsService(): IHackerNewsService {
      return getEnv(self).hackerNewsService;
    },
    get urlHashService(): IURLHashService {
      return getEnv(self).urlHashService;
    },
    get scrapingService(): IScrapingService {
      return getEnv(self).scrapingService;
    },
    get news(): INewsItem[] {
      return Array.from(self.items.values());
    },
    newsItemById(id: number): INewsItem {
      return self.items.get(id.toString());
    }
  }))
  .actions(self => {
    const setLoading = (loading: boolean) => {
      self.loading = loading;
    };

    const shouldReload = (lastUpdateAt?: Date) => {
      const now = moment();
      const lastFetch = self.updatedAt;
      return now.diff(lastFetch, "minutes") !== 0;
    };

    const updateItem = (item: INewsItem) => {
      self.items.set(item.id.toString(), item);
    };

    const topStories = flow(function* fetchTopStories() {
      if (!shouldReload(self.updatedAt)) {
        return;
      }

      setLoading(true);

      let stories: IHackerNewsStory[] = yield self.hackerNewsService.topStories(
        50
      );
      self.items.clear();

      stories = stories.filter(story => story.type === "story" && story.url);
      stories.forEach(story => {
        self.items.put(
          NewsItemModel.create({
            id: story.url
              ? self.urlHashService.hash(story.url)
              : Math.random() * 100,
            publishedAt: moment.unix(story.time).toISOString(),
            state: NewsItemModelState.Pending,
            title: story.title,
            url: story.url
          })
        );
      });

      setLoading(false);
      self.updatedAt = new Date();
    });

    const expand = flow(function*(id: number) {
      const item = self.items.get(id.toString());
      if (item.state !== NewsItemModelState.Pending) {
        return;
      }

      item.state = NewsItemModelState.Progress;

      const scraped: IScrapeResponse = yield self.scrapingService.scrape(
        item.url
      );

      if (scraped.ok) {
        const data = scraped.data;
        item.source = data.source;
        item.description = data.description;
        item.title = data.title;
        item.url = data.url;
        item.urlToImage = data.cover_image_url;
        item.publishedAt = data.date_published || item.publishedAt;
        item.state = NewsItemModelState.Done;
      } else {
        item.state = NewsItemModelState.Error;
      }
    });

    const afterCreate = () => {
      topStories();
    };

    return {
      afterCreate,
      expand,
      topStories
    };
  });

export type INewsStore = typeof NewsStore.Type;
