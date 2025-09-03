import type { ItemCarrinho } from "../types";

type CartItemProps = {
  item: ItemCarrinho;
  onRemoveFromCart: (id: number) => void;
  onUpdateQuantity: (id: number, novaQuantidade: number) => void;
};

function CartItem({ item, onRemoveFromCart, onUpdateQuantity }: CartItemProps) {
  return (
    <li className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="item-info">
        <p>{item.title}</p>

        <div className="quantity-control">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantidade - 1)}
          >
            -
          </button>
          <span>{item.quantidade}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantidade + 1)}
          >
            +
          </button>
        </div>
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
