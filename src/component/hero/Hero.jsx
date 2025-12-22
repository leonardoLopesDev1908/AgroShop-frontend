import React from 'react'
import HeroSlider from './HeroSlider'
import SearchBar from '../search/SearchBar'

const Hero = () => {
    return (
        <div className='hero'>
            <HeroSlider />
            <div className='hero-content'>
                <h1>Bem vindo ao <span className='text-primary'>AgroShop</span></h1>
                <SearchBar/>
                <div className='home-button-container'>
                    {/* <a href="#" className="home-shop-button link">
                        Compre agora
                    </a>
                    <button className='deals-button'>Promoções de hoje</button> */}
                </div>
            </div>
        </div>
    )
}

export default Hero