import Config from "react-native-config";
import { NewsAPIService } from "../Services/NewsAPIService";
import { NewsStore } from "./NewsStore";

const createStore = () => {
  const api = new NewsAPIService(Config.NEWS_API_BASE_URL, Config.NEWS_API_KEY);
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
