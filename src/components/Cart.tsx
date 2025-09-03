import type { ItemCarrinho } from "../types";
import CartItem from "./CartItem";

type CartProps = {
  itens: ItemCarrinho[];
  onRemoveFromCart: (id: number) => void;
  onUpdateQuantity: (id: number, novaQuantidade: number) => void;
};

function Cart({ itens, onRemoveFromCart, onUpdateQuantity }: CartProps) {
  const total = itens.reduce((soma, item) => {
    return soma + item.price * item.quantidade;
  }, 0);

  return (
    <aside className="cart">
      <h2>Meu Carrinho</h2>

      <div className="cart-body">
        {itens.length === 0 ? (
          <p className="empty-cart-message">O seu carrinho está vazio.</p>
        ) : (
          <ul>
            {itens.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemoveFromCart={onRemoveFromCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </ul>
        )}
      </div>

      <div className="cart-total">
        <h3>Total:</h3>
        <h3>R$ {total.toFixed(2)}</h3>
      </div>
    </aside>
  );
}

export default Cart;
