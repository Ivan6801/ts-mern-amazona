import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Product";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ["products", slug],
    queryFn: async () => {
      try {
        const response = await apiClient.get<Product>(`api/products/${slug}`);
        console.log("Response:", response); // Agrega un console.log para ver la respuesta de la API en la consola del navegador.
        return response.data;
      } catch (error) {
        console.error("Error fetching product details:", error); // Agrega un console.error para ver los errores en la consola del navegador.
        throw new Error("Error fetching product details");
      }
    },
  });

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (await apiClient.get<[]>(`/api/products/categories`)).data,
  });
