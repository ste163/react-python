/**
 * This file contains exports for the used definitions from the OpenAPI spec
 */
import type { components, paths } from "./api";

export type Task = components["schemas"]["Task"];
export type GetTaskResponse =
  paths["/tasks/"]["get"]["responses"]["200"]["content"]["application/json"];
