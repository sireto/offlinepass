import { isMskValid } from "../../utils/validationUtils";
import GeneratePasswordView from "../generate-password/generate-password-view";

describe("Testing the Genereate-Password-View Component", () => {
  test("should fail on msk validation", () => {
    const testMsk = "Simplemsk123";
    expect(isMskValid(testMsk)).toBe(true);
  });
});
