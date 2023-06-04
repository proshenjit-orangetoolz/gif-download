import './App.css';
import React from "react";
import GifDownload from "./components/GifDownload";
import GifDownloadWithGifShot from "./components/GifDownloadWithGifShot";
import GifDownloadWithFileSaver from "./components/GifDownloadWithFileSaver";
import DragableComponent from "./components/DragableComponent";

function App() {
    return (
        <div className="App">
            {/*<GifDownloadWithFileSaver/>*/}
            {/*<GifDownloadWithGifShot/>*/}
            {/*<GifDownload/>*/}
            <DragableComponent/>
            {/*<h1>Fabric JS - Text on Image</h1>*/}
            {/*<MemeCreator/>*/}
            {/*<h1>Fabric JS - Text on Image</h1>*/}
            {/*<ImageUpload/>*/}
        </div>

    );
}

export default App;
