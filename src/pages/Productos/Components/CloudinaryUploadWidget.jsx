import React from 'react'
import "../../Registro/styles/style.css";

export const CloudinaryUploadWidget = () => {
    const cloudName = "djnzoyal5"; // replace with your own cloud name
    const uploadPreset = "preset_pabs"; // replace with your own upload preset

    const myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploadPreset, 
            theme:"purple",
            clientAllowedFormats: ["jpg","png"],
            multiple: true,
            sources: [ "local", "url"]
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
                        }
        }
    );

    const openingWidget=()=>{
        myWidget.open()
    }

    return (
        <button onClick={openingWidget}  className="learn-more">Sube las imagenes del producto</button>
    )
}
