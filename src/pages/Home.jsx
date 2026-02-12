import React from 'react'
import ButtonGroup from '../components/ButtonGroup'
import Header from '../components/Header'
import ImageSelector from '../components/ImageSelector'
const Home = () => {
  return (
    < div className='home-page'>
        <div className='container'>
            <h1>How Does it Work </h1>
            <p className='desc'>
            With the help of our generator creating html imagemaps is free and easy. 
            Simply start by selecting an image from your pc,
            or load one directly from an external website. 
            Next up create your hot areas using either rectangle, circle or polygon shapes. 
            Creating these shapes is as easy as pointing and clicking on your image. Don't forget to enter a link, title and target for each of them.
            Then once you're finished simply click Show Me The Code!
            </p>
            <ImageSelector/>
           <div className='info-section'>
            <div>
                <h2>What is an Image map?</h2>
                <p>Originally introduced in HTML 3.2 as a replacement for server side imagemaps. 
                   Server side image maps were clunky requiring a round trip to the web server to determine where to go based on the coordinates clicked in the image. 
                   Thus client side image-maps were born!
                </p>
                <p>
                   An imagemap is a graphic image where a user can click on different parts of the image and be directed to different destinations. 
                   imagemaps are made by defining each of the hot areas in terms of their x and y coordinates (relative to the top left hand corner).
                    With each set of coordinates, you specify a link that users will be directed to when they click within the area.
                </p>
                <h1>About</h1>
                <p>
                    We make it extremely easy to create free HTML based image maps. Our tool was build from the ground up with the modern browsers in mind, and sadly in turn doesn't support older browsers (sorry IE8 and lower!). 
                    All operations are completely client side in your browser using the power of HTML5, SVG and JavaScript.
                </p>
                <p>
                    Disclaimer: No image from your PC are ever transferred out of your browser. 
                    All files loaded from your PC are read using the FileReader 
                    JavaScript API directly off your hard drive in to your browser.
                </p>
            </div>
           </div>
        </div>

    </div>
  )
}

export default Home
