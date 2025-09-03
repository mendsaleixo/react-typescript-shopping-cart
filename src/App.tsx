import { useState, useEffect } from "react";
import type { Produto, ItemCarrinho } from "./types";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart"; // 1. Importe o Carrinho
import "./styles/main.css";

const apiUrl = "https://fakestoreapi.com/products";

function App() {
  // Estado para guardar a lista de produtos vinda da API
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // Estado para guardar os itens no nosso carrinho de compras
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  // Estado para controlar a mensagem de "carregando..." para uma melhor UX
  const [loading, setLoading] = useState(true);

  // Efeito para buscar os produtos da API apenas uma vez, quando o componente é montado
  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const resposta = await fetch(apiUrl);
        if (!resposta.ok) {
          throw new Error("Falha ao buscar os produtos.");
        }
        const dados: Produto[] = await resposta.json();
        setProdutos(dados);
      } catch (erro) {
        console.error("Erro ao buscar produtos:", erro);
      } finally {
        setLoading(false);
      }
    };
    buscarProdutos();
  }, []); // O array vazio [] garante que isto só executa uma vez

  const handleAddToCart = (produtoAdicionado: Produto) => {
    // Verificamos se o produto já existe no carrinho pelo seu id
    const produtoJaExiste = carrinho.find(
      (item) => item.id === produtoAdicionado.id
    );

    if (produtoJaExiste) {
      // Se existe: criamos um NOVO array (imutabilidade) e apenas
      // incrementamos a quantidade do item correspondente.
      const novoCarrinho = carrinho.map((item) =>
        item.id === produtoAdicionado.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
      setCarrinho(novoCarrinho);
    } else {
      // Se não existe: criamos um NOVO item de carrinho com quantidade 1,
      // e o adicionamos a um NOVO array com todos os itens antigos.
      const novoItem = { ...produtoAdicionado, quantidade: 1 };
      setCarrinho([...carrinho, novoItem]);
    }
  };

  const handleRemoveFromCart = (idDoProduto: number) => {
    const novoCarrinho = carrinho.filter((item) => item.id !== idDoProduto);
    setCarrinho(novoCarrinho);
  };

  return (
    <div className="app-layout">
      <header>
        <h1>Minha Loja</h1>
      </header>
      <main className="container">
        {loading ? (
          <p>Carregando produtos...</p>
        ) : (
          <ProductList produtos={produtos} onAddToCart={handleAddToCart} />
        )}
      </main>
      <Cart itens={carrinho} onRemoveFromCart={handleRemoveFromCart} />
    </div>
  );
}

export default App;
