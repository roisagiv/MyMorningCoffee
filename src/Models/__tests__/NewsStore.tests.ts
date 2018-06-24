/* tslint:disable:no-implicit-dependencies */
import Faker from "faker";
import FirebaseServer from "firebase-server";
import nock from "nock";
import json from "../../../e2e/firebase/stories.json";
import { HackerNewsService } from "../../Services/HackerNewsService";
import { MercuryParserScrapingService } from "../../Services/ScrapingService";
import { URLHashService } from "../../Services/URLHashService";
import { NewsItemModelState } from "../NewsItem";
import { NewsStore } from "../NewsStore";

jest.mock("react-native-firebase");

/**
 *
 *
 * @param {number} length
 */
const newsItemGenerator = (length: number) =>
  Array(length)
    .fill({})
    .map((value: any, index: number) => ({
      author: Faker.name.title(),
      description: Faker.lorem.paragraph(),
      id: index,
      publishedAt: Faker.date.recent().toISOString(),
      source: Faker.company.companyName(),
      title: Faker.lorem.sentence(),
      url: Faker.internet.url(),
      urlToImage: `https://loremflickr.com/320/240?random=${Faker.random.number()}`
    }))
    .reduce((obj: any, item) => {
      obj[item.id] = item;
      return obj;
    }, {});

/**
 *
 *
 * @param {string} url
 */
const configureScrapingService = (url: string) => {
  nock(url)
    .get("/parser")
    .query(true)
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
};

describe("NewsStore", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("can create items in store", () => {
    const length = 4;
    const news = newsItemGenerator(length);
    const store = NewsStore.create({
      items: news
    });
    expect(store.news).toHaveLength(length);
  });

  describe("topStories", () => {
    let server: FirebaseServer;

    beforeEach(() => {
      const payload: any = json;
      server = new FirebaseServer(5000, "topStories", payload);
    });

    afterEach(() => {
      server.close();
    });

    it("fills the items with responses", async () => {
      const service = new HackerNewsService(
        "ws://localhost:5000",
        "123",
        "123",
        "123",
        "123",
        "123"
      );
      const hash = new URLHashService();
      const store = NewsStore.create(
        {},
        {
          hackerNewsService: service,
          scrapingService: {},
          urlHashService: hash
        }
      );

      await store.topStories();
      expect(store.news).toHaveLength(10);
      expect(
        store.news.every(item => item.state === NewsItemModelState.Pending)
      ).toBeTruthy();
    });
  });

  describe("expand item", () => {
    it("set item's state to progress", async () => {
      const scrapeBaseUrl = "http://localhost:3000";
      configureScrapingService(scrapeBaseUrl);
      const scraping = new MercuryParserScrapingService(scrapeBaseUrl, "123");

      const length = 4;
      const news = newsItemGenerator(length);
      const store = NewsStore.create(
        {
          items: news
        },
        {
          hackerNewsService: {},
          scrapingService: scraping,
          urlHashService: {}
        }
      );

      const id = news[0].id;

      store.expand(id);

      expect(store.items.get(id.toString()).state).toEqual(
        NewsItemModelState.Progress
      );
    });

    it("set item's state to done upon success", async () => {
      const scrapeBaseUrl = "http://localhost:3000";
      configureScrapingService(scrapeBaseUrl);
      const scraping = new MercuryParserScrapingService(scrapeBaseUrl, "123");

      const length = 4;
      const news = newsItemGenerator(length);
      const store = NewsStore.create(
        {
          items: news
        },
        {
          hackerNewsService: {},
          scrapingService: scraping,
          urlHashService: {}
        }
      );

      const id = news[0].id;

      await store.expand(id);

      expect(store.items.get(id.toString()).state).toEqual(
        NewsItemModelState.Done
      );
    });

    it("set item's state to error upon failure", async () => {
      const scrapeBaseUrl = "http://localhost:3000";
      nock(scrapeBaseUrl)
        .get("/parser")
        .query(true)
        .reply(504);

      const scraping = new MercuryParserScrapingService(scrapeBaseUrl, "123");

      const length = 4;
      const news = newsItemGenerator(length);
      const store = NewsStore.create(
        {
          items: news
        },
        {
          hackerNewsService: {},
          scrapingService: scraping,
          urlHashService: {}
        }
      );

      const id = news[0].id;

      await store.expand(id);

      expect(store.items.get(id.toString()).state).toEqual(
        NewsItemModelState.Error
      );
    });

    it("should not expand if item not pending", () => {
      const scraping = {
        scrape: jest.fn()
      };

      const length = 4;
      const news = newsItemGenerator(length);
      news[0].state = NewsItemModelState.Progress;
      news[1].state = NewsItemModelState.Done;
      news[2].state = NewsItemModelState.Error;
      const store = NewsStore.create(
        {
          items: news
        },
        {
          hackerNewsService: {},
          scrapingService: scraping,
          urlHashService: {}
        }
      );

      store.expand(news[0].id);
      store.expand(news[1].id);
      store.expand(news[2].id);

      expect(scraping.scrape).not.toBeCalled();
    });
  });
});
