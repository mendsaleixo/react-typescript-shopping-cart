import type { Produto } from "../types";

type ProductCardProps = {
  produto: Produto;
};

function ProductCard({ produto }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={produto.image} alt={produto.title} />
      <h3>{produto.title}</h3>
      <p className="price">€ {produto.price.toFixed(2)}</p>
      <button>Adicionar ao Carrinho</button>
    </div>
  );
}

export default ProductCard;
