import Services from "../Services";
import { NewsStore } from "./NewsStore";

const createStore = () => {
  const api = Services.newsApiService();
  const newsStore = NewsStore.create({}, { newsApiService: api });

  if (__DEV__) {
    const middlewares = require("mst-middlewares");
    /* tslint:disable:no-implicit-dependencies */
    const remotedev = require("remotedev");
    middlewares.connectReduxDevtools(remotedev, newsStore);
  }

  return newsStore;
};

const store = createStore();
export default store;
