/* tslint:disable:no-implicit-dependencies */
import Faker from "faker";
import { when } from "mobx";
import nock from "nock";
import { NewsAPIService } from "../../Services/NewsAPIService";
import { NewsStore } from "../NewsStore";

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

  it("fills the items with the response", done => {
    nock("http://localhost:5000")
      .get("/top-headlines")
      .query({ country: "us" })
      .replyWithFile(200, __dirname + "/top-headlines.json", {});
    const api = new NewsAPIService("http://localhost:5000", "123");
    const store = NewsStore.create({}, { newsApiService: api });

    store.fetch();

    when(
      () => store.loading === false,
      () => {
        expect(store.error).toBeNull();
        expect(store.items).toHaveLength(20);
        done();
      }
    );
  });

  it("fills the error property", done => {
    nock("http://localhost:5000")
      .get("/top-headlines?country=us")
      .query({ country: "us" })
      .reply(500);
    const api = new NewsAPIService("http://localhost:5000", "123");
    const store = NewsStore.create({}, { newsApiService: api });

    store.fetch();

    when(
      () => store.loading === false,
      () => {
        expect(store.error).not.toBeNull();
        expect(store.items).toHaveLength(0);
        done();
      }
    );
  });
});
