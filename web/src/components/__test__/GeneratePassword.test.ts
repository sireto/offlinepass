import { isMskValid } from "@app/utils/validationUtils";
describe("Testing the Genereate-Password-View Component", () => {
  test("should fail on msk validation", () => {
    const testMsk = "Simplemsk123";
    expect(isMskValid(testMsk)).toBe(true);
  });
});
