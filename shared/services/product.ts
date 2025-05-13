import { Product } from "@prisma/client";
import { http } from "./axios";
import { ApiRoutes } from "./constants";

export const search = async (query: string): Promise<Product[]> =>
    (
        await http.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
            params: { query },
        })
    ).data;
