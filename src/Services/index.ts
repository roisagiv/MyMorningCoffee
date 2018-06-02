import Config from "./Config";
import { NewsAPIService } from "./NewsAPIService";

export default {
  newsApiService: () => {
    return new NewsAPIService(Config.baseURL, Config.apiKey);
  }
};
