import apisauce, { ApiResponse, ApisauceInstance } from "apisauce";
import limit from "p-limit";

/**
 *
 *
 * @export
 * @interface IScrapedItem
 */
export interface IScrapedItem {
  author?: string;
  description?: string;
  url: string;
  cover_image_url?: string;
  date_published?: string;
  title?: string;
}

/**
 *
 *
 * @export
 * @interface IScrapingService
 */
export default interface IScrapingService {
  /**
   *
   *
   * @param {string} url
   * @returns {Promise<IScrapedItem>}
   * @memberof IScrapingService
   */
  scrape(url: string): Promise<IScrapeResponse>;
}

/**
 *
 *
 * @interface IMercoryParserResponse
 */
interface IMercoryParserResponse {
  author?: string;
  title: string;
  content?: string;
  date_published?: string;
  lead_image_url?: string;
  dek?: string;
  url: string;
  domain?: string;
  excerpt?: string;
  word_count?: number;
  direction?: string;
  total_pages?: number;
  rendered_pages?: number;
  next_page_url?: string;
}

export interface IScrapeResponse {
  ok: boolean;
  error?: Error;
  data?: IScrapedItem;
}

/**
 *
 *
 * @export
 * @class MercuryParserScrapingService
 * @implements {IScrapingService}
 */
export class MercuryParserScrapingService implements IScrapingService {
  private client: ApisauceInstance;
  private limit: (
    fn: () => PromiseLike<IScrapeResponse>
  ) => Promise<IScrapeResponse>;

  /**
   * Creates an instance of MercuryParserScrapingService.
   * @param {string} baseURL
   * @param {string} apiKey
   * @memberof MercuryParserScrapingService
   */
  constructor(baseURL: string, apiKey: string) {
    this.client = apisauce.create({
      baseURL,
      headers: { "x-api-key": apiKey }
    });
    this.limit = limit(5);
  }

  /**
   *
   *
   * @param {string} url
   * @returns {Promise<IScrapedItem>}
   * @memberof MercuryParserScrapingService
   */
  public scrape(url: string): Promise<IScrapeResponse> {
    return this.limit(() =>
      this.client
        .get(`parser?url=${encodeURI(url)}`)
        .then((response: ApiResponse<IMercoryParserResponse>) => {
          if (response.ok) {
            const payload: IMercoryParserResponse = response.data;
            const result: IScrapedItem = {
              author: payload.author,
              cover_image_url: payload.lead_image_url,
              date_published: payload.date_published,
              description: payload.excerpt,
              title: payload.title,
              url: payload.url
            };
            return {
              data: result,
              error: null,
              ok: true
            };
          }
          // else
          return { ok: false, error: new Error(response.problem), data: null };
        })
    );
  }
}
