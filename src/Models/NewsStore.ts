import { AxiosPromise, AxiosResponse } from "axios";
import { flow, getEnv, types } from "mobx-state-tree";
import INewsAPIService, {
  ITopHeadlinesResponse
} from "../Services/NewsAPIService";
import { NewsItemModel } from "./NewsItem";

export const NewsStore = types
  .model({
    error: types.maybe(types.string),
    items: types.optional(types.array(NewsItemModel), []),
    loading: types.optional(types.boolean, true)
  })
  .actions(self => {
    const setLoading = (loading: boolean) => {
      self.loading = loading;
    };

    const fetch = flow(function* fetchTopHeadlines() {
      setLoading(true);
      const api: INewsAPIService = getEnv(self).newsApiService;
      try {
        const response: AxiosResponse<
          ITopHeadlinesResponse
        > = yield api.topHeadlines();

        if (response.status >= 200 && response.status < 400) {
          self.items.clear();
          const news = response.data.articles.map(article => {
            return NewsItemModel.create({
              ...article
            });
          });
          news.forEach(item => self.items.push(item));
          setLoading(false);
        } else {
          self.error = response.statusText;
        }
      } catch (error) {
        self.error = error.toString();
      } finally {
        setLoading(false);
      }
    });

    return {
      fetch
    };
  });

export type INewsStore = typeof NewsStore.Type;
