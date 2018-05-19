import axios, { AxiosInstance, AxiosPromise } from "axios";

export default interface INewsAPIService {
  topHeadlines(): AxiosPromise<ITopHeadlinesResponse>;
}

export class NewsAPIService implements INewsAPIService {
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
