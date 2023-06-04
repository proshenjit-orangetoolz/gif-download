import React, {useEffect, useRef, useState} from 'react';
import {fabric} from 'fabric';
import Draggable from 'react-draggable'; // Both at the same time


const ImageUpload = () => {

    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [textColor, setTextColor] = useState('white');
    const [header, setHeader] = useState('Add text here');
    const [footer, setFooter] = useState('');

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

            canvas.on('mouse:down', function (options) {
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
    const handleHeader = (e) => {
        setHeader(e.target.value);
    }

    return (
        <>
            <Draggable>
                <div className="box" style={{
                    display: 'block',
                }}>
                    <p
                        className="header"
                        style={{
                            color : 'black',
                            backgroundColor: 'white',
                            fontWeight: 'bold',
                            padding: '2px'
                        }}>
                        {header}
                    </p>
                    <canvas ref={canvasRef} width={500} height={500}/>
                    <p className="footer"></p>
                </div>
            </Draggable>
            <div style={{
                margin: '15px',
            }}>
                <input
                    type="text"
                    value={header}
                    onChange={handleHeader}
                />
                {/*<input*/}
                {/*    type="color"*/}
                {/*    value={textColor}*/}
                {/*    onChange={handleTextColorChange}*/}
                {/*/>*/}
                <button onClick={handleButtonClick}>Add Text</button>
            </div>


        </>
    );
}

export default ImageUpload;