/**
 *
 *
 * @export
 * @interface INewsSourceItem
 */
export interface INewsSourceItem {
  author?: string;
  description?: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage?: string;
}

/**
 *
 *
 * @export
 * @interface INewsSourceProvider
 */
export default interface INewsSourceProvider {
  /**
   *
   *
   * @param {number} limit
   * @returns {Promise<INewsSourceItem[]>}
   * @memberof INewsSourceProvider
   */
  fetch(limit: number): Promise<INewsSourceItem[]>;
}
