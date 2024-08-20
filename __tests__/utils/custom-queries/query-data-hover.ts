import { createQuery } from "./create-query";

const {
  queryByAttribute: queryByDataHover,
  queryAllByAttribute: queryAllByDataHover,
  getByAttribute: getByDataHover,
  getAllByAttribute: getAllByDataHover,
  findByAttribute: findByDataHover,
  findAllByAttribute: findAllByDataHover,
} = createQuery("data-hover");

export {
  queryByDataHover,
  queryAllByDataHover,
  getByDataHover,
  getAllByDataHover,
  findAllByDataHover,
  findByDataHover,
};
