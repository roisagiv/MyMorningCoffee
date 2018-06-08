import { AxiosResponse } from "axios";
import { flow, getEnv, types } from "mobx-state-tree";
import moment from "moment";
import {
  IHackerNewsService,
  IHackerNewsStory
} from "../Services/HackerNewsService";
import INewsAPIService, {
  ITopHeadlinesResponse
} from "../Services/NewsAPIService";
import IScrapingService, {
  IScrapedItem,
  IScrapeResponse
} from "../Services/ScrapingService";
import IURLHashService from "../Services/URLHashService";
import { INewsItem, NewsItemModel } from "./NewsItem";

export const NewsStore = types
  .model({
    error: types.maybe(types.string),
    items: types.optional(types.map(NewsItemModel), {}),
    loading: types.optional(types.boolean, false),
    updatedAt: types.maybe(types.Date)
  })
  .views(self => ({
    get newsService(): INewsAPIService {
      return getEnv(self).newsApiService;
    },
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

    const fetch = flow(function* fetchTopHeadlines() {
      if (!shouldReload(self.updatedAt)) {
        return;
      }

      setLoading(true);

      try {
        const response: AxiosResponse<
          ITopHeadlinesResponse
        > = yield self.newsService.topHeadlines();

        if (response.status >= 200 && response.status < 400) {
          self.items.clear();
          const news = response.data.articles.map(article => {
            return NewsItemModel.create({
              id: self.urlHashService.hash(article.url),
              ...article
            });
          });
          news.forEach(item => self.items.put(item));
          setLoading(false);
        } else {
          self.error = response.statusText;
        }
      } catch (error) {
        self.error = error.toString();
      } finally {
        setLoading(false);
        self.updatedAt = new Date();
      }
    });

    const topStories = flow(function* fetchTopStories() {
      setLoading(true);

      let stories: IHackerNewsStory[] = yield self.hackerNewsService.topStories(
        50
      );
      self.items.clear();

      stories = stories.filter(story => story.type === "story" && story.url);
      const scraped = stories.map(story => {
        return self.scrapingService.scrape(story.url);
      });
      const data: IScrapeResponse[] = yield Promise.all(scraped);
      data.forEach(response => {
        if (!response.ok) {
          return;
        }

        const item = response.data;
        self.items.put(
          NewsItemModel.create({
            author: item.author,
            description: item.description,
            id: item.url
              ? self.urlHashService.hash(item.url)
              : Math.random() * 100,
            publishedAt: item.date_published,
            source: { id: "", name: "" },
            title: item.title,
            url: item.url,
            urlToImage: item.cover_image_url
          })
        );
      });

      setLoading(false);
      self.updatedAt = new Date();
    });

    return {
      fetch,
      topStories
    };
  });

export type INewsStore = typeof NewsStore.Type;
