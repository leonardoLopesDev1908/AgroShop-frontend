import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import bg1 from "../../assets/imagens/image1.png"
import bg2 from "../../assets/imagens/image2.png"
import bg3 from "../../assets/imagens/image3.png"
import bg4 from "../../assets/imagens/image4.png"

const imagens = [bg1, bg2, bg3, bg4]

const HeroSlider = () => {
    const settings = {
        dots: true, 
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000, 
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false
    }

    return (
        <Slider {...settings} className='hero-slider'>
            {imagens.map((img, index) => (
                <div key={index} className='slide'>
                    <img 
                        src={img} 
                        alt={`Slide ${index + 1}`} 
                        className='slide-image'
                    />
                </div>
            ))}
        </Slider>
    )
}

export default HeroSlider