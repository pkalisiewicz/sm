import {
  getFilteredByOccurence,
  getFilteredByUnique,
  getIdFromObjectPairs,
  mapBySpaces,
  mapToValueCount,
  mapWithUniqueId,
  parseFromTextToArray,
  sortDescendingByCount,
  splitByNewLine,
} from "./mapping";

describe("mapWithUniqueId", () => {
  const parameters = { name: "hello", value: "yoyoyo" };
  const expectedResult = { name: "hello", value: "yoyoyo", id: "1" };
  expect(mapWithUniqueId(parameters)).toEqual(expectedResult);
});

describe("getFilteredByOccurence", () => {
  it("should match the expected output", () => {
    const parameters = [
      { name: "hello", value: "1" },
      { name: "world", value: "2" },
      { name: "world", value: "2" },
      { name: "hello", value: "3" },
    ];
    const expectedResults = [
      { name: "hello", count: 2, id: "2" },
      { name: "world", count: 1, id: "3" },
    ];

    expect(getFilteredByOccurence(parameters)).toEqual(expectedResults);
  });
});

describe("getFilteredByUnique", () => {
  it("should match the expected output", () => {
    const parameters = [
      { name: "good", value: "1" },
      { name: "morning", value: "2" },
      { name: "mr", value: "2" },
      { name: "world", value: "3" },
    ];
    const expectedResults = [
      { name: "good", count: 1, id: "4" },
      { name: "morning", count: 1, id: "5" },
      { name: "mr", count: 1, id: "6" },
      { name: "world", count: 1, id: "7" },
    ];

    expect(getFilteredByUnique(parameters)).toEqual(expectedResults);
  });
});

describe("getIdFromObjectPairs", () => {
  it("should match the expected output", () => {
    const parameters = getIdFromObjectPairs({ name: "hey", value: "123" });
    const expectedResult = { name: "hey", value: "123", id: "hey-123" };
    expect(getIdFromObjectPairs(parameters)).toEqual(expectedResult);
  });
});

describe("mapBySpaces", () => {
  it("should match the expected output", () => {
    const parameters = "hellloo iammrspace";
    const expectedResult = { name: "hellloo", value: "iammrspace" };
    expect(mapBySpaces(parameters)).toEqual(expectedResult);
  });
});

describe("mapToValueCount", () => {
  const count = 1;
  const name = "hey";
  const expectedResult = { count: 1, name: "hey" };
  expect(mapToValueCount(count, name)).toEqual(expectedResult);
});

describe("parseFromTextToArray", () => {
  const parameter = "et 127.0.0.1\ngohome 127.0.0.1";
  const expectedResult = [
    { name: "et", value: "127.0.0.1" },
    { name: "gohome", value: "127.0.0.1" },
  ];
  expect(parseFromTextToArray(parameter)).toEqual(expectedResult);
});

describe("sortDescendingByCount", () => {
  const parameter = [
    { name: "hey", count: 15, value: "is", id: "5" },
    { name: "yoyo", count: 551, value: "here", id: "1" },
  ];
  const expectedResult = [
    { name: "yoyo", count: 551, value: "here", id: "1" },
    { name: "hey", count: 15, value: "is", id: "5" },
  ];
  expect(sortDescendingByCount(parameter)).toEqual(expectedResult);
});

describe("splitByNewLine", () => {
  const parameter = "et 127.0.0.1\ngohome 127.0.0.1";
  const expectedResult = ["et 127.0.0.1", "gohome 127.0.0.1"];
  expect(splitByNewLine(parameter)).toEqual(expectedResult);
});
