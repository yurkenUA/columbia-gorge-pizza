import { Ingredient } from "@prisma/client";
import { http } from "./axios";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Ingredient[]> =>
    (await http.get<Ingredient[]>(ApiRoutes.GET_INGREDIENTS, {})).data;
