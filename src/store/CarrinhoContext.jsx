import {createContext, useContext, useState, useEffect} from "react"

const CarrinhoContext = createContext()

export const CarrinhoProvider = ({children}) => {
    const[contagem, setContagem] = useState(0)

    useEffect(() => {
        localStorage.setItem("cartCount", contagem);
    }, [contagem]);

    useEffect(() => {
    const saved = localStorage.getItem("cartCount");
    if (saved !== null && contagem === 0) {
        setContagem(parseInt(saved, 10));
    }
    }, []); 
    
    const addToCarrinho = (quantidade = 1) => {
        setContagem((prev) => prev + quantidade)
    }

    const removeFromCarrinho = (quantidade = 1) => {
        setContagem((prev) => prev - quantidade)
    }

    const clearCarrinhoContagem = () => setContagem(0)
    
    return (
    <CarrinhoContext.Provider value={{ contagem, addToCarrinho, clearCarrinhoContagem, removeFromCarrinho}}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCart = () => useContext(CarrinhoContext);
