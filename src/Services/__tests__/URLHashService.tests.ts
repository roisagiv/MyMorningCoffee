import { URLHashService } from "../URLHashService";
describe("URLHashService", () => {
  it("hash urls", () => {
    const urlHash = new URLHashService();

    expect(
      urlHash.hash("https://marc.info/?l=openbsd-tech&m=152894815409098&w=2")
    ).toEqual(113049093);

    expect(
      urlHash.hash(
        "https://marc.info/?l=openbsd-tech&m=152894815409098&w=2&utm_medium=social"
      )
    ).toEqual(113049093);
  });
});
