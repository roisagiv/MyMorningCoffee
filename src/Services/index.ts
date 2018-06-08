import Config from "./Config";
import { HackerNewsService, IHackerNewsService } from "./HackerNewsService";
import INewsAPIService, { NewsAPIService } from "./NewsAPIService";
import IScrapingService, {
  IScrapedItem,
  MercuryParserScrapingService
} from "./ScrapingService";
import IURLHashService, { URLHashService } from "./URLHashService";

export default {
  hackerNewsService: (): IHackerNewsService => {
    return new HackerNewsService(
      Config.hackerNewsAPI,
      Config.firebaseApiKey,
      Config.firebaseAppId,
      Config.messagingSenderId,
      Config.projectId,
      Config.storageBucketId
    );
  },

  newsApiService: (): INewsAPIService => {
    return new NewsAPIService(Config.baseURL, Config.apiKey);
  },

  scrapingService: (): IScrapingService => {
    return new MercuryParserScrapingService(
      Config.mercuryParserBaseURL,
      Config.mercuryParserApiKey
    );
  },

  urlHashService: (): IURLHashService => {
    return new URLHashService();
  }
};
