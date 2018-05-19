import Config from "react-native-config";
import { NewsStore } from "../Models/NewsStore";
import { NewsAPIService } from "../Services/NewsAPIService";

const createStore = () => {
  const api = new NewsAPIService(Config.NEWS_API_BASE_URL, Config.NEWS_API_KEY);
  const store = NewsStore.create({}, { newsApiService: api });

  if (__DEV__) {
    const middlewares = require("mst-middlewares");
    /* tslint:disable:no-implicit-dependencies */
    const remotedev = require("remotedev");
    middlewares.connectReduxDevtools(remotedev, store);
  }

  return store;
};

export default createStore;