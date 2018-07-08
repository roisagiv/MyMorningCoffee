/* tslint:disable:no-implicit-dependencies */
import IScrapingService, {
  MercuryParserScrapingService
} from "../ScrapingService";

import Faker from "faker";
import nock from "nock";

describe("MercuryParserScrapingService", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("scrape url with mercory parser api", async () => {
    const url =
      "https://www.nytimes.com/2018/06/11/well/lasik-complications-vision.html";
    const baseUrl = "http://localhost:5000";

    const payload = {
      author: Faker.finance.accountName(),
      content: Faker.lorem.paragraphs(10),
      date_published: Faker.date.recent().toISOString(),
      direction: "ltr",
      domain: Faker.internet.url(),
      excerpt: Faker.lorem.sentence(30),
      lead_image_url: Faker.internet.url(),
      title: Faker.lorem.sentence(15),
      url: Faker.internet.url()
    };

    nock(baseUrl)
      .get("/parser")
      .query({ url })
      .reply(200, payload);

    const service: IScrapingService = new MercuryParserScrapingService(
      baseUrl,
      "123"
    );

    const response = await service.scrape(url);
    expect(response.ok).toBeTruthy();
    expect(response.error).toBeNull();

    const result = response.data;
    expect(result.source).toEqual(payload.domain);
    expect(result.cover_image_url).toEqual(payload.lead_image_url);
    expect(result.date_published).toEqual(payload.date_published);
    expect(result.description).toEqual(payload.excerpt);
    expect(result.title).toEqual(payload.title);
    expect(result.url).toEqual(payload.url);
  });
});
