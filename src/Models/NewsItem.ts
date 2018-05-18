export interface INewsItemSource {
  id?: string;
  name?: string;
}

export interface INewsItem {
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source?: INewsItemSource;
}
