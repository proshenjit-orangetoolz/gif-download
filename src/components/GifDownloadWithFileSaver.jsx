import React, { useRef } from 'react';
import { saveAs } from 'file-saver';

const GifDownloadWithFileSaver = () => {
    const canvasRef = useRef(null);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Load the GIF image
        const gifImage = new Image();
        gifImage.src = 'https://res.cloudinary.com/demo/image/upload/kitten_fighting.gif';
        gifImage.setAttribute('crossorigin', 'anonymous');

        gifImage.onload = () => {
            // Draw the GIF image onto the canvas
            ctx.drawImage(gifImage, 0, 0, canvas.width, canvas.height);

            // Add text overlay
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText('Helloooooooooooo!!!!!', 10, 30);

            // Convert canvas to Blob
            canvas.toBlob(blob => {
                // Save the Blob as a file
                saveAs(blob, 'overlayed.gif');
            }, 'image/gif');
        };
    };

    return (
        <div>
            <canvas ref={canvasRef} width={400} height={400} />
            <button onClick={handleDownload}>Download GIF</button>
        </div>
    );
};

export default GifDownloadWithFileSaver;