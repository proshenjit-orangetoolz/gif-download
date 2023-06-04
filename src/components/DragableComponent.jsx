import React, {useEffect, useState} from 'react';
import Draggable from "react-draggable";
import gif from '../asset/giphy.gif';
import * as htmlToImage from 'html-to-image';


const DragableComponent = () => {
    const imageUrl = gif;
    const [textColor, setTextColor] = useState('white'); // Initial text state
    const [header, setHeader] = useState('Add text here');
    const [position, setPosition] = useState({x: 0, y: 0});


    useEffect(() => {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        // Create a new image element
        var image = new Image();

        // Load the GIF image
        image.src = gif;

        // When the image is loaded, draw it on the canvas
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;

            // Draw the image on the canvas
            context.drawImage(image, 0, 0);

            // Add text on the canvas
            context.font = '20px Arial';
            context.fillStyle = 'red';
            context.fillText('Your Text Here', 10, 30);

            // Convert the canvas to a data URL
            var dataUrl = canvas.toDataURL('image/gif');

            // Create a link element for downloading
            var link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'modified.gif';

            // Trigger the download
            // link.click();
    }},[])
    const handleDownload = () => {
        var node = document.getElementById('my-node');

        htmlToImage.toJpeg(document.getElementById('my-node'), {quality: 0.95})
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                link.click();
            });
    }

    const handleDownloadGif = () => {
        const div = document.getElementById('my-node');

        const link = document.createElement('a');

        // var paragraph = document.createElement("p");
        // paragraph.textContent = "This is a new paragraph.";

        link.href = gif;
        link.download = 'filename.gif';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);


    };


    const handleDrag = (e, ui) => {
        const {x, y} = ui;
        setPosition({x, y});
    };
    const handleTextColorChange = (e) => {
        setTextColor(e.target.value);
    }

    const handleHeader = (e) => {
        setHeader(e.target.value);
    }

    const handleButtonClick = () => {

    }

    return (
        <div>
            <div id="my-node"
                 style={{
                     width: '400px',
                     height: 'auto',
                     display: 'block',
                     border: '2px solid black'
                 }}>
                <div>
                    <p style={{
                        color: 'black',
                        backgroundColor: 'white',
                        textShadow: 'rgb(0, 0, 0) -1px -1px 0px, rgb(0, 0, 0) 1px -1px 0px, rgb(0, 0, 0) -1px 1px 0px, rgb(0, 0, 0) 1px 1px 0px',
                        letterSpacing: '0.2rem'
                    }}>Header</p>
                </div>
                <div
                    style={{
                        background: `url(${imageUrl})`,
                        width: '400px',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div style={{width: '400px', height: '300px', border: '1px solid black', position: 'relative'}}>
                        <Draggable
                            onDrag={handleDrag}
                            bounds="parent"
                            defaultPosition={{x: 50, y: 50}}
                            // You can set other options like bounds, axis, etc. if needed
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'move',
                                    textShadow: 'rgb(0, 0, 0) -1px -1px 0px, rgb(0, 0, 0) 1px -1px 0px, rgb(0, 0, 0) -1px 1px 0px, rgb(0, 0, 0) 1px 1px 0px',
                                    letterSpacing: '0.1rem'
                                }}>
                                <h3 style={{color: textColor}}>{header}</h3>
                            </div>
                        </Draggable>
                    </div>
                </div>
                <div>
                    <p style={{
                        color: 'black',
                        backgroundColor: 'white',
                        textShadow: 'rgb(0, 0, 0) -1px -1px 0px, rgb(0, 0, 0) 1px -1px 0px, rgb(0, 0, 0) -1px 1px 0px, rgb(0, 0, 0) 1px 1px 0px',
                        letterSpacing: '0.2rem'
                    }}>Footer</p>
                </div>
            </div>
            <div>
                <input
                    type="color"
                    value={textColor}
                    onChange={handleTextColorChange}
                />
                <input
                    type="text"
                    value={header}
                    onChange={handleHeader}
                />
                <button onClick={handleButtonClick}>Add Text</button>
                <button onClick={handleDownload}>Download as Image</button>
                <button onClick={handleDownloadGif}>Download as Gif</button>
            </div>

        </div>
    );
};

export default DragableComponent;