/* tslint:disable:no-implicit-dependencies */
import Faker from "faker";
import FirebaseServer from "firebase-server";
import { url } from "inspector";
import nock from "nock";
import json from "../../../e2e/firebase/stories.json";
import { HackerNewsService } from "../../Services/HackerNewsService";
import { NewsAPIService } from "../../Services/NewsAPIService";
import { MercuryParserScrapingService } from "../../Services/ScrapingService";
import { URLHashService } from "../../Services/URLHashService";
import { NewsStore } from "../NewsStore";

jest.mock("react-native-firebase");

describe("NewsStore", () => {
  it("can create items in store", () => {
    const length = 4;
    const news = Array(length)
      .fill({})
      .map(() => ({
        author: Faker.name.title(),
        description: Faker.lorem.paragraph(),
        id: Faker.random.number(),
        publishedAt: Faker.date.recent().toISOString(),
        source: {
          id: Faker.random.uuid(),
          name: Faker.company.companyName()
        },
        title: Faker.lorem.sentence(),
        url: Faker.internet.url(),
        urlToImage: `https://loremflickr.com/320/240?random=${Faker.random.number()}`
      }));
    const store = NewsStore.create({
      items: news.reduce((obj: any, item) => {
        obj[item.id] = item;
        return obj;
      }, {})
    });
    expect(store.news).toHaveLength(length);
  });

  describe("fetch", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it("fills the items with the response", async () => {
      nock("http://localhost:5000")
        .get("/top-headlines")
        .query({ country: "us" })
        .replyWithFile(200, __dirname + "/top-headlines.json", {});
      const api = new NewsAPIService("http://localhost:5000", "123");
      const hash = new URLHashService();
      const store = NewsStore.create(
        {},
        { newsApiService: api, urlHashService: hash }
      );

      expect(store.loading).toEqual(false);
      await store.fetch();
      expect(store.error).toBeNull();
      expect(store.news).toHaveLength(20);
    });

    it("fills the error property", async () => {
      nock("http://localhost:5000")
        .get("/top-headlines")
        .query({ country: "us" })
        .reply(500);
      const api = new NewsAPIService("http://localhost:5000", "123");
      const store = NewsStore.create({}, { newsApiService: api });

      await store.fetch();
      expect(store.error).not.toBeNull();
      expect(store.news).toHaveLength(0);
    });
  });

  describe("topStories", () => {
    let server: FirebaseServer;

    beforeEach(() => {
      const payload: any = json;
      server = new FirebaseServer(5000, "topStories", payload);
    });

    afterEach(() => {
      server.close();
      nock.cleanAll();
    });

    it("fills the items with responses", async () => {
      nock("http://localhost:3000")
        .get("/parser")
        .query(true)
        .times(10)
        .reply(() => {
          return [
            200,
            {
              author: Faker.finance.accountName(),
              content: Faker.lorem.paragraphs(10),
              date_published: Faker.date.recent().toISOString(),
              direction: "ltr",
              domain: Faker.internet.url(),
              excerpt: Faker.lorem.sentence(30),
              lead_image_url: Faker.internet.url(),
              title: Faker.lorem.sentence(15),
              url: Faker.internet.url()
            }
          ];
        });

      const service = new HackerNewsService(
        "ws://localhost:5000",
        "123",
        "123",
        "123",
        "123",
        "123"
      );
      const hash = new URLHashService();
      const scraping = new MercuryParserScrapingService(
        "http://localhost:3000",
        "123"
      );
      const store = NewsStore.create(
        {},
        {
          hackerNewsService: service,
          newsApiService: {},
          scrapingService: scraping,
          urlHashService: hash
        }
      );

      await store.topStories();
      expect(store.news).toHaveLength(10);
    });
  });
});
