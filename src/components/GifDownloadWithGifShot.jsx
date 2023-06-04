import React, { useRef } from 'react';
import gifshot from 'gifshot';

function GifDownloadWithGifShot() {
    const canvasRef = useRef(null);

    const handleGenerateGif = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Load the GIF image
        const img = new Image();
        img.src = 'https://res.cloudinary.com/demo/image/upload/kitten_fighting.gif';
        img.setAttribute('crossorigin', 'anonymous');

        img.onload = () => {
            // Set canvas dimensions to match the GIF
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the GIF image on the canvas
            ctx.drawImage(img, 0, 0);

            // Add text to the canvas
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('helloooooo!!!!', canvas.width / 2, canvas.height / 2);

            // Generate the GIF
            gifshot.createGIF({ gifWidth: canvas.width, gifHeight: canvas.height, images: [canvas.toDataURL()] }, (obj) => {
                if (!obj.error) {
                    const { image } = obj;
                    const link = document.createElement('a');
                    link.href = image;
                    link.download = 'modified.gif';
                    link.click();
                }
            });
        };
    };

    return (
        <div className="App">
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <button onClick={handleGenerateGif}>Generate GIF</button>
        </div>
    );
}

export default GifDownloadWithGifShot;