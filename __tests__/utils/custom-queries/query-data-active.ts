import { createQuery } from "./create-query";

const {
  queryByAttribute: queryByDataActive,
  queryAllByAttribute: queryAllByDataActive,
  getByAttribute: getByDataActive,
  getAllByAttribute: getAllByDataActive,
  findByAttribute: findByDataActive,
  findAllByAttribute: findAllByDataActive,
} = createQuery("data-active");

export {
  queryByDataActive,
  queryAllByDataActive,
  getByDataActive,
  getAllByDataActive,
  findAllByDataActive,
  findByDataActive,
};
