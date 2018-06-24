import Services from "../Services";
import { NewsStore } from "./NewsStore";

const createStore = () => {
  const hnApi = Services.hackerNewsService();
  const urlHashService = Services.urlHashService();
  const scraping = Services.scrapingService();

  const newsStore = NewsStore.create(
    {},
    {
      urlHashService,
      // tslint:disable-next-line:object-literal-sort-keys
      hackerNewsService: hnApi,
      scrapingService: scraping
    }
  );

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
