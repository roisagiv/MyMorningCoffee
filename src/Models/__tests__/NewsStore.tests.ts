/* tslint:disable:no-implicit-dependencies */
import Faker from "faker";
import nock from "nock";
import { NewsStore } from "../";
import { NewsAPIService } from "../../Services/NewsAPIService";

describe("NewsStore", () => {
  it("can create items in store", () => {
    const length = 4;
    const news = Array(length)
      .fill({})
      .map(() => ({
        author: Faker.name.title(),
        description: Faker.lorem.paragraph(),
        publishedAt: Faker.date.recent().toISOString(),
        source: {
          id: Faker.random.uuid(),
          name: Faker.company.companyName()
        },
        title: Faker.lorem.sentence(),
        url: Faker.internet.url(),
        urlToImage: `https://loremflickr.com/320/240?random=${Faker.random.number()}`
      }));
    const store = NewsStore.create({ items: news });
    expect(store.items).toHaveLength(length);
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
      const store = NewsStore.create({}, { newsApiService: api });

      expect(store.loading).toEqual(false);
      await store.fetch();
      expect(store.error).toBeNull();
      expect(store.items).toHaveLength(20);
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
      expect(store.items).toHaveLength(0);
    });
  });
});
