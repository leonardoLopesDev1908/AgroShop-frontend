 import React, { useState, useEffect} from 'react'

 const ProductImage = ({productId}) => {
    const[productImg, setProductImg] = useState(null)

    useEffect(() => {
        const fetchProductImage = async (id) => {
            try{
                const response = await fetch(
                    `http://localhost:8080/api/v1/imagens/imagem/download/${id}`
                );
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProductImg(reader.result);
                };
                reader.readAsDataURL(blob);
            } catch(error){
                console.error("Erro buscando imagem: ", error)
                setProductImg(null);
            }
        };

        if(productId){
            fetchProductImage(productId);
        }
    }, [productId]);
    

    return (
        <div>
            <img src={productImg} alt='Imagem do produto'></img>
        </div>
    )
 }

 export default ProductImage