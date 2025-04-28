import { createAction } from "./create";
import { deleteAction } from "./delete";
import { updateAction } from "./update/index.ts";

export const task = {
  createAction,
  updateAction,
  deleteAction,

}