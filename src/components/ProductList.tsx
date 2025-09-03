import type { Produto } from "../types";
import ProductCard from "./ProductCard";

type ProductListProps = {
  produtos: Produto[];
  onAddToCart: (produto: Produto) => void; // Tipagem da nossa função
};

function ProductList({ produtos, onAddToCart }: ProductListProps) {
  return (
    <div className="product-list">
      {produtos.map((produto) => (
        <ProductCard
          key={produto.id}
          produto={produto}
          onAddToCart={onAddToCart} // Repassando para o filho
        />
      ))}
    </div>
  );
}

export default ProductList;
