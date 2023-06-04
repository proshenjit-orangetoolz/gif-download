import React, { useEffect, useRef } from 'react';
import gif from '../asset/giphy.gif';

function addTextToGif(gifUrl, text, fontSize, textColor, canvasRef) {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = gifUrl;
    image.setAttribute('crossorigin', 'anonymous');

    image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0);

        context.font = `${fontSize}px Arial`;
        context.fillStyle = textColor;
        context.fillText(text, 10, 30);
    };
}

function GifDownload() {
    const gifUrl = 'https://res.cloudinary.com/demo/image/upload/kitten_fighting.gif';
    const text = 'Your Text Here';
    const fontSize = 20;
    const textColor = 'red';

    const canvasRef = useRef(null);

    useEffect(() => {
        addTextToGif(gifUrl, text, fontSize, textColor, canvasRef);
    }, []);

    const handleDownload = () => {
        const dataUrl = canvasRef.current.toDataURL('gif/image');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'modified.gif';
        link.click();
    };

    return (
        <div>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <button onClick={handleDownload}>Download GIF</button>
        </div>
    );
}

export default GifDownload;