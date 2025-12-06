import React, { useState, useEffect} from 'react'
import {api} from "../services/"

 const ProductImage = ({productId}) => {
    const[productImg, setProductImg] = useState(null)

    useEffect(() => {
        const fetchProductImage = async (id) => {
            try{
                const response = await api.get(
                    `/produto/imagens/${id}/download`
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