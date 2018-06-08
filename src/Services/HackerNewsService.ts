import firebase, { RNFirebase } from "react-native-firebase";

export interface IHackerNewsStory {
  id: number;
  score: number;
  time: number;
  title: string;
  type?: string;
  url: string;
}
export interface IHackerNewsService {
  topStories(limit: number): Promise<IHackerNewsStory[]>;
}

export class HackerNewsService implements IHackerNewsService {
  private db: RNFirebase.database.Database;

  constructor(
    databaseURL: string,
    apiKey: string,
    appId: string,
    messagingSenderId: string,
    projectId: string,
    storageBucket: string
  ) {
    const firebaseApp = firebase.initializeApp(
      {
        apiKey,
        appId,
        databaseURL,
        messagingSenderId,
        projectId,
        storageBucket
      },
      "MyMorningCoffee"
    );
    this.db = firebaseApp.database();
  }

  /**
   * @returns {Promise<IHackerNewsStory[]>}
   * @memberof HackerNewsService
   */
  public async topStories(limit: number): Promise<IHackerNewsStory[]> {
    const storiesIdsRequest = await this.db
      .ref("v0/topstories")
      .limitToFirst(limit)
      .once("value");
    const storiesIds: number[] = storiesIdsRequest.val();
    return Promise.all(storiesIds.map(id => this.fetchItem(id)));
  }

  /**
   * @private
   * @param {number} id
   * @returns {Promise<IHackerNewsStory>}
   * @memberof HackerNewsService
   */
  private async fetchItem(id: number): Promise<IHackerNewsStory> {
    const story = await this.db.ref(`v0/item/${id}`).once("value");
    return story.val();
  }
}
