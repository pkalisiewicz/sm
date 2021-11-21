import orderBy from "lodash/orderBy";
import split from "lodash/split";
import map from "lodash/map";
import countBy from "lodash/countBy";
import uniqBy from "lodash/uniqBy";
import uniqueId from "lodash/uniqueId";

import { ReturnNameValue, ReturnObjects, ReturnObjectWithId } from "../types";

export function sortDescendingByCount(array: ReturnObjectWithId[]) {
  return orderBy(array, "count", "desc");
}

export function getFilteredByOccurence(
  array: ReturnNameValue[]
): ReturnObjectWithId[] {
  const mappedWithId = map(array, getIdFromObjectPairs);
  const filtered = uniqBy(mappedWithId, "id");
  const counted = getFilteredByUnique(filtered) as ReturnObjectWithId[];

  return counted;
}

export function splitByNewLine(text: string) {
  const trimmedText = text?.trim();
  return split(trimmedText, "\n");
}

export function mapBySpaces(element: string) {
  const [name, value] = split(element, " ");
  return { name, value };
}

export function parseFromTextToArray(text: string) {
  const arrayParsedByNewlines = splitByNewLine(text);
  const arrayParsedBySpaces = map(arrayParsedByNewlines, mapBySpaces);

  return arrayParsedBySpaces;
}

export function mapToValueCount(count: number, name: string): ReturnObjects {
  return { name, count };
}

export function getFilteredByUnique(
  array: ReturnNameValue[]
): ReturnObjectWithId[] {
  const counted = countBy(array, "name");
  const mapped = map(counted, mapToValueCount);
  const withUniqueIds = map(mapped, mapWithUniqueId) as ReturnObjectWithId[];

  return withUniqueIds;
}

export function getIdFromObjectPairs(
  object: ReturnNameValue
): ReturnObjectWithId {
  return { ...object, id: `${object.name}-${object.value}` };
}

export function mapWithUniqueId(object: object): object {
  return { ...object, id: uniqueId() };
}
