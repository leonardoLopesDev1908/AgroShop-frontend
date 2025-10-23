import React, { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [contagem, setContagem] = useState(() => {
    try {
      const saved = localStorage.getItem("cartCount");
      return saved !== null ? Math.max(0, parseInt(saved, 10) || 0) : 0;
    } catch (e) {
      console.error("Erro lendo cartCount do localStorage:", e);
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartCount", String(contagem));
    } catch (e) {
      console.error("Erro salvando cartCount no localStorage:", e);
    }
  }, [contagem]);

  const addToCarrinho = (quantidade = 1) => {
    setContagem((prev) => Math.max(0, prev + Number(quantidade)));
  };

  const removeFromCarrinho = (quantidade = 1) => {
    setContagem((prev) => Math.max(0, prev - Number(quantidade)));
  };

  const clearCarrinhoContagem = () => setContagem(0);

  return (
    <CarrinhoContext.Provider
      value={{ contagem, addToCarrinho, removeFromCarrinho, clearCarrinhoContagem }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCart = () => useContext(CarrinhoContext);
