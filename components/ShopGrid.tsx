"use client";

import { useMemo, useState } from "react";
import { categoryFilters, products, type Category } from "@/lib/products";
import ProductCard from "./ProductCard";
import { Search } from "./Icons";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export default function ShopGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesTerm =
        !term ||
        `${product.name} ${product.tagline} ${product.size} ${product.description} ${product.categoryLabel}`
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesTerm;
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [query, category, sort]);

  return (
    <>
      <div className="shop-toolbar">
        <div className="shop-search">
          <Search size={17} />
          <label htmlFor="shop-search" className="sr-only">
            Search our water
          </label>
          <input
            id="shop-search"
            type="search"
            placeholder="Search by size, pack or name…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="shop-filters" role="group" aria-label="Filter by category">
          {categoryFilters.map((filter) => (
            <button
              type="button"
              className="chip"
              key={filter.id}
              data-active={category === filter.id}
              onClick={() => setCategory(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="shop-sort">
          <label htmlFor="shop-sort">Sort</label>
          <select id="shop-sort" value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>

        <p className="shop-count">
          Showing {filtered.length} of {products.length} products
          {query && ` for “${query}”`}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state" style={{ border: "1px dashed var(--line-strong)", borderRadius: 24 }}>
          <div className="empty-state__icon">
            <Search size={30} />
          </div>
          <h3>Nothing matched that search</h3>
          <p>Try a different size — 50cl, 75cl, 1.5L or 19L — or clear your filters to see everything.</p>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            <span>Clear filters</span>
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      )}
    </>
  );
}
