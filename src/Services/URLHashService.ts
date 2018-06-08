import normalize from "normalize-url";
import stringHash from "string-hash";

export default interface IURLHashService {
  hash(url: string): number;
}

export class URLHashService implements IURLHashService {
  public hash(url: string): number {
    try {
      const normalizedUrl = normalize(url || "");
      return stringHash(normalizedUrl);
    } catch {
      return Math.random() * 100;
    }
  }
}
