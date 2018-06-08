// tslint:disable-next-line:no-implicit-dependencies
import * as jsonServer from "json-server";
import { NewsAPIService } from "../NewsAPIService";

describe("NewsAPIService", () => {
  const server = jsonServer.create();
  const router = jsonServer.router(
    __dirname + "/../../../e2e/json-server/db.json"
  );
  const middlewares = jsonServer.defaults();
  let app: { close: () => void };

  beforeEach(() => {
    server.use(router);
    server.use(middlewares);
    app = server.listen(5000);
  });

  afterEach(() => {
    app.close();
  });

  it("fills the items with the response", async () => {
    const api = new NewsAPIService("http://localhost:5000", "123");

    const results = await api.fetch(30);
    expect(results).toHaveLength(10);
  });
});
