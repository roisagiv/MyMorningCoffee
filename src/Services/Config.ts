import Config from "react-native-config";

export default {
  apiKey: Config.NEWS_API_KEY,
  baseURL: Config.NEWS_API_BASE_URL,
  firebaseApiKey: Config.FIREBASE_API_KEY,
  firebaseAppId: Config.FIREBASE_APP_ID,
  hackerNewsAPI: Config.FIREBASE_DATABASE_URL,
  mercuryParserApiKey: Config.MERCURY_PARSER_API_KEY,
  mercuryParserBaseURL: Config.MERCURY_PARSER_BASE_URL,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucketId: Config.FIREBASE_STORAGE_BUCKET_ID
};
