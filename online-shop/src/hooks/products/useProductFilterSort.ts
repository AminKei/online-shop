import { useMemo, useState } from "react";
import type { Product } from "../../types/products";

const MAX_PRICE = 200_000_000;
const PAGE_SIZE = 12;

export const useProductFilter = (products: Product[]) => {
  /* ---------- state ---------- */
  const [sortBy, setSortBy] = useState("relevant");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    MAX_PRICE,
  ]);
  const [gender, setGender] = useState<"men" | "women" | null>(null);
  const [type, setType] = useState<"perfume" | "body_splash" | null>(null);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  /* ---------- filter + sort ---------- */
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
        const inGender = gender ? p.gender === gender : true;
        const inType = type ? p.type === type : true;
        return inPrice && inGender && inType;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "discount") return (b.discount || 0) - (a.discount || 0);
        return 0;
      });
  }, [products, priceRange, gender, type, sortBy]);

  /* ---------- pagination ---------- */
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return {
    // data
    paginatedProducts,
    total: filteredProducts.length,

    // states
    sortBy,
    priceRange,
    gender,
    type,
    page,
    filterOpen,

    // setters
    setSortBy,
    setPriceRange,
    setGender,
    setType,
    setPage,
    setFilterOpen,

    // constants
    MAX_PRICE,
    PAGE_SIZE,
  };
};
