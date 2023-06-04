import React, {useEffect, useRef, useState} from 'react';
import {fabric} from 'fabric';
import gif from '../asset/giphy.gif';

const ImageUpload = () => {

    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [textColor, setTextColor] = useState('white'); // Initial text state

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current);
        setCanvas(canvas);

        // Load the image onto the canvas
        fabric.Image.fromURL('https://picsum.photos/id/237/200/300', (img) => {
            // Scale the image to fit the canvas size
            canvas.setBackgroundImage(
                img,
                canvas.renderAll.bind(canvas),
                {
                    top: 10,
                    scaleX: canvas.width / img.width,
                    scaleY: canvas.height / img.height,
                }
            );

            canvas.on('mouse:down', function(options) {
                if (options.target) {
                    return;
                }

                const pointer = canvas.getPointer(options.e);
                const text = new fabric.IText('Enter text...', {
                    left: pointer.x,
                    top: pointer.y,
                    fontFamily: 'Arial',
                    fontSize: 24,
                    fill: 'black',
                    editable: true,
                });

                canvas.add(text);
                canvas.setActiveObject(text);
                canvas.renderAll();
            });

        });
    }, []);


    const handleButtonClick = () => {
        if (canvas) {
            const text = new fabric.IText('Enter text...', {
                left: 50,
                top: 50,
                fontFamily: 'Arial',
                fontSize: 24,
                fill: textColor,
                editable: true,
            });

            canvas.add(text);
            canvas.setActiveObject(text);
            canvas.renderAll();
        }
    };

    const handleTextColorChange = (e) => {
        setTextColor(e.target.value);
    }

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <canvas aria-disabled ref={canvasRef} width={500} height={500}/>
            </div>
            <div style={{
                margin: '15px',
            }}>
                <input
                    type="color"
                    value={textColor}
                    onChange={handleTextColorChange}
                />
                <button onClick={handleButtonClick}>Add Text</button>
            </div>
        </>
    );
}

export default ImageUpload;