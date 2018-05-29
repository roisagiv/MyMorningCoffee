/* tslint:disable:no-implicit-dependencies */
import { by, device, element, expect } from "detox";

describe("Top News Screen", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("first article is displayed", async () => {
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
});
