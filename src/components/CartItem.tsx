import type { ItemCarrinho } from "../types";

type CartItemProps = {
  item: ItemCarrinho;
  onRemoveFromCart: (id: number) => void;
};

function CartItem({ item, onRemoveFromCart }: CartItemProps) {
  return (
    <li className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="item-info">
        <p>{item.title}</p>
        <p>Quantidade: {item.quantidade}</p>
      </div>
      <p className="item-price">
        R$ {(item.price * item.quantidade).toFixed(2)}
      </p>

      <button className="remove-btn" onClick={() => onRemoveFromCart(item.id)}>
        &times;
      </button>
    </li>
  );
}

export default CartItem;
