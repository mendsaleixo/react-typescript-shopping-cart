import type { Produto } from "../types";

type ProductCardProps = {
  produto: Produto;
  onAddToCart: (produto: Produto) => void; // Recebendo a função
};

function ProductCard({ produto, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={produto.image} alt={produto.title} />
      <h3>{produto.title}</h3>
      <p className="price">€ {produto.price.toFixed(2)}</p>
      {/* Conectando a função ao onClick do botão */}
      <button onClick={() => onAddToCart(produto)}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default ProductCard;
