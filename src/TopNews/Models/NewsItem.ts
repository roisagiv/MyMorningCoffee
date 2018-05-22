import { types } from "mobx-state-tree";

const NewsItemSourceModel = types.model({
  id: types.maybe(types.string),
  name: types.maybe(types.string)
});

export const NewsItemModel = types.model({
  author: types.maybe(types.string),
  description: types.maybe(types.string),
  publishedAt: types.string,
  source: types.maybe(NewsItemSourceModel),
  title: types.string,
  url: types.string,
  urlToImage: types.maybe(types.string)
});

export type INewsItemSource = typeof NewsItemSourceModel.Type;
export type INewsItem = typeof NewsItemModel.Type;
