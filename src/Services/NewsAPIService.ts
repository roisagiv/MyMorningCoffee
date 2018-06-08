import axios, { AxiosInstance, AxiosPromise } from "axios";
import INewsSourceProvider, { INewsSourceItem } from "./INewsSourceProvider";

export default interface INewsAPIService {
  topHeadlines(): AxiosPromise<ITopHeadlinesResponse>;
}

export class NewsAPIService implements INewsAPIService, INewsSourceProvider {
  private axios: AxiosInstance;

  constructor(baseURL: string, apiKey: string) {
    this.axios = axios.create({
      baseURL,
      headers: {
        "X-Api-Key": apiKey
      }
    });
  }

  public topHeadlines(): AxiosPromise<ITopHeadlinesResponse> {
    return this.axios.get(`top-headlines?country=us`);
  }

  /**
   *
   *
   * @param {number} limit
   * @returns {Promise<INewsSourceItem[]>}
   * @memberof NewsAPIService
   */
  public fetch(limit: number): Promise<INewsSourceItem[]> {
    return this.topHeadlines().then(response => {
      return response.data.articles.map(article => ({
        author: article.author,
        description: article.description,
        publishedAt: article.publishedAt,
        title: article.title,
        url: article.url,
        urlToImage: article.urlToImage
      }));
    });
  }
}

export interface ITopHeadlinesResponse {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export interface IArticle {
  source: ISource;
  author: null | string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

export interface ISource {
  id: null | string;
  name: string;
}
