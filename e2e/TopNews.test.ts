/* tslint:disable:no-implicit-dependencies */
import { by, device, element, expect } from "detox";

describe("Top News Screen", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("displays the first article", async () => {
    await expect(element(by.text("Top News"))).toBeVisible();
    await expect(element(by.text("The New York Times"))).toBeVisible();
    await expect(
      element(
        by.text(
          "Santa Fe High's Baseball Team Takes the Field, Shadowed by Tragedy"
        )
      )
    ).toBeVisible();
  });

  it("opens the full article page", async () => {
    const url =
      "http://localhost:3000/en.wikipedia.org/wiki/Special:Random.0.html";

    await expect(element(by.text("Top News"))).toBeVisible();
    await expect(element(by.id(url))).toBeVisible();
    await element(by.id(url)).tap();

    await expect(
      element(
        by.text(
          "Santa Fe High's Baseball Team Takes the Field, Shadowed by Tragedy"
        )
      )
    ).toBeVisible();
  });
});
