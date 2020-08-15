import knex from "knex";

import { development } from "../../knexfile";

export const db = knex(development);
