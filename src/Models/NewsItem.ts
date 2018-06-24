import { types } from "mobx-state-tree";

export enum NewsItemModelState {
  Done = "done",
  Error = "error",
  Pending = "pending",
  Progress = "progress"
}

export const NewsItemModel = types.model({
  author: types.maybe(types.string),
  description: types.maybe(types.string),
  id: types.identifier(types.number),
  publishedAt: types.maybe(types.string),
  source: types.maybe(types.string),
  state: types.optional(
    types.enumeration(
      Object.keys(NewsItemModelState).map(key => NewsItemModelState[key as any])
    ),
    NewsItemModelState.Pending.toLowerCase()
  ),
  title: types.maybe(types.string),
  url: types.maybe(types.string),
  urlToImage: types.maybe(types.string)
});

export type INewsItem = typeof NewsItemModel.Type;
