// Ficheiro: src/components/ProductList.tsx

import type { Produto } from "../types";
import ProductCard from "./ProductCard";

type ProductListProps = {
  produtos: Produto[];
};

function ProductList({ produtos }: ProductListProps) {
  return (
    <div className="product-list">
      {produtos.map((produto) => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}

export default ProductList;
