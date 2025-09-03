import { useState, useEffect } from "react";
import type { Produto } from "./types";
import ProductList from "./components/ProductList";
import "./styles/main.css";

const apiUrl = "https://fakestoreapi.com/products";

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
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

  return (
    <div className="container">
      <h1>Vitrine de Produtos</h1>
      {loading ? (
        <p>A carregar produtos...</p>
      ) : (
        <ProductList produtos={produtos} />
      )}
    </div>
  );
}

export default App;
