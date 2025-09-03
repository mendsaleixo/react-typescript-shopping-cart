import { useState, useEffect } from "react";
import type { Produto, ItemCarrinho } from "./types";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./styles/main.css";

const apiUrl = "https://fakestoreapi.com/products";

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const resposta = await fetch(apiUrl);
        if (!resposta.ok) throw new Error("Falha ao buscar os produtos.");
        const dados: Produto[] = await resposta.json();
        setProdutos(dados);
      } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
      } finally {
        setLoading(false);
      }
    };
    buscarProdutos();
  }, []);

  const handleAddToCart = (produtoAdicionado: Produto) => {
    const produtoJaExiste = carrinho.find(
      (item) => item.id === produtoAdicionado.id
    );

    if (produtoJaExiste) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === produtoAdicionado.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([...carrinho, { ...produtoAdicionado, quantidade: 1 }]);
    }
  };

  const handleRemoveFromCart = (idDoProduto: number) => {
    setCarrinho(carrinho.filter((item) => item.id !== idDoProduto));
  };

  const handleUpdateQuantity = (
    idDoProduto: number,
    novaQuantidade: number
  ) => {
    if (novaQuantidade <= 0) {
      handleRemoveFromCart(idDoProduto);
    } else {
      setCarrinho(
        carrinho.map((item) =>
          item.id === idDoProduto
            ? { ...item, quantidade: novaQuantidade }
            : item
        )
      );
    }
  };

  return (
    <div className="app-layout">
      <header>
        <h1>Minha Loja</h1>
      </header>
      <main>
        <div className="container">
          <h1>Nossos Produtos</h1>
          {loading ? (
            <p>A carregar produtos...</p>
          ) : (
            <ProductList produtos={produtos} onAddToCart={handleAddToCart} />
          )}
        </div>
      </main>

      <Cart
        itens={carrinho}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
}

export default App;
