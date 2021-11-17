import {
  ERROR_KEY,
  ERROR_TIME,
} from "../components/SubmitSong/song/song.error";
import { isKeyArt, isLegalTime, formatKey, formatTime } from "./inputCheck";
describe("isKeyArt", () => {
  test("correct simple input", () => {
    expect(isKeyArt("C")).toBe(true);
  });
  test("correct moll input", () => {
    expect(isKeyArt("Cm")).toBe(true);
  });
  test("correct moll input camel-case", () => {
    expect(isKeyArt("Cm")).toBe(true);
  });
  test("correct with extra spaces", () => {
    expect(isKeyArt("C   m  ")).toBe(true);
  });
  test("correct b input", () => {
    expect(isKeyArt("Cb")).toBe(true);
  });
  test("correct # input", () => {
    expect(isKeyArt("C#")).toBe(true);
  });
  test("correct # and moll input", () => {
    expect(isKeyArt("C#m")).toBe(true);
  });
  test("incorrect input two letters", () => {
    expect(isKeyArt("Ca")).toBe(false);
  });
  test("incorrect input too long", () => {
    expect(isKeyArt("C#m2")).toBe(false);
  });
});

describe("isLegalTime", () => {
  test("correct input simple case", () => {
    expect(isLegalTime("4/4")).toBe(true);
  });
  test("incorrect input simple case", () => {
    expect(isLegalTime("44")).toBe(false);
  });

  test("correct input additive case", () => {
    expect(isLegalTime("4/4+8/4+3/2")).toBe(true);
  });
  test("incorrect input additive case", () => {
    expect(isLegalTime("4/4+8/43/2")).toBe(false);
  });
  test("correct input with extra spaces", () => {
    expect(isLegalTime("4/4 + 8/4 + 3/2")).toBe(true);
  });
});

describe("formatKey", () => {
  test("correct input uppercase", () => {
    expect(formatKey("CBM")).toBe("Cbm");
  });
  test("incorrect input", () => {
    expect(() => formatKey("CD")).toThrow(Error(ERROR_KEY));
  });

  test("correct input whitespace and lowercase", () => {
    expect(formatKey("c # m")).toBe("C#m");
  });
});

describe("formatTime", () => {
  test("correct input no change", () => {
    expect(formatTime("4/4")).toBe("4/4");
  });
  test("incorrect input", () => {
    expect(() => formatTime("4/4+4")).toThrow(Error(ERROR_TIME));
  });

  test("correct input whitespace", () => {
    expect(formatTime("4/ 4")).toBe("4/4");
  });
  test("correct additive whitespace", () => {
    expect(formatTime("4/ 4 + 5/5+4/2")).toBe("4/4 + 5/5 + 4/2");
  });
});
