import React from 'react'
import ButtonGroup from '../components/ButtonGroup'
import Header from '../components/Header'
import ImageSelector from '../components/ImageSelector'
const Home = () => {
  return (
    < div className='home-page'>
        <div className='container'>
            <h1>Image Map Generator</h1>
            <p className='desc'>
            With the help of our generator creating html imagemaps is free and easy. 
            Simply start by selecting an image from your pc,
            or load one directly from an external website. 
            Next up create your hot areas using either rectangle, circle or polygon shapes. 
            Creating these shapes is as easy as pointing and clicking on your image. Don't forget to enter a link, title and target for each of them.
            Then once you're finished simply click Show Me The Code!
            </p>
            <ImageSelector/>
          
        </div>

    </div>
  )
}

export default Home
