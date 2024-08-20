import {
  queryHelpers,
  buildQueries,
  Matcher,
  MatcherOptions,
} from "@testing-library/react";

export function createQuery(attribute: string) {
  const queryAllByAttribute = (
    container: HTMLElement,
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => queryHelpers.queryAllByAttribute(attribute, container, id, options);

  const getMultipleError = (c: any, dataValue: any) =>
    `Found multiple elements with the ${attribute} attribute of: ${dataValue}`;

  const getMissingError = (c: any, dataValue: any) =>
    `Unable to find an element with the ${attribute} attribute of: ${dataValue}`;

  const [
    queryByAttribute,
    getAllByAttribute,
    getByAttribute,
    findAllByAttribute,
    findByAttribute,
  ] = buildQueries(queryAllByAttribute, getMultipleError, getMissingError);

  return {
    queryByAttribute,
    queryAllByAttribute,
    getByAttribute,
    getAllByAttribute,
    findAllByAttribute,
    findByAttribute,
  };
}
