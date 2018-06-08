/* tslint:disable:no-implicit-dependencies */
import FirebaseServer from "firebase-server";
import json from "../../../e2e/firebase/stories.json";
import { HackerNewsService } from "../HackerNewsService";

jest.mock("react-native-firebase");

describe("HackerNewsService", () => {
  let server: FirebaseServer;

  beforeEach(() => {
    const payload: any = json;
    server = new FirebaseServer(5000, "HackerNewsService", payload);
  });

  afterEach(() => {
    server.close();
  });
  it("can connect to local", async () => {
    const service = new HackerNewsService(
      "ws://localhost:5000",
      "123",
      "",
      "",
      "",
      ""
    );

    const stories = await service.topStories(10);
    expect(stories).toHaveLength(10);
  });
});
