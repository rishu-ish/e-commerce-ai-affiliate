"use client";

// src/lib/queries/productQueries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface ProductType {
    _id: string;
    title: string;
    description?: string;
    price?: number;
    image?: string;
    affiliateLink?: string;
    category?: string;
    createdAt?: string;
    updatedAt?: string;
}

// Fetch products
const fetchProducts = async (): Promise<ProductType[]> => {
    const res = await fetch("/api/products", { cache: "no-store" });
    const data = await res.json();

    if (!res.ok || !data.success) throw new Error(data.message || "Failed to fetch products");
    return data.products;
};


export const useProducts = () => {
    return useQuery<ProductType[]>({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });
};

// Delete product
const deleteProduct = async (_id: string) => {
    const res = await fetch(`/api/products/${_id}`, {
        method: "DELETE",
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.message || "Failed to delete product");
    return _id;
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};
