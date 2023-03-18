import React from "react";
import "../../../style/styleForm.css";

export const CloudinaryUploadWidget = ({ recibirURL }) => {
	const urlsImages = [];
	const cloudName = "djnzoyal5"; // replace with your own cloud name
	const uploadPreset = "preset_pabs"; // replace with your own upload preset

	const myWidget = window.cloudinary.createUploadWidget(
		{
			cloudName: cloudName,
			uploadPreset: uploadPreset,
			theme: "blue",
			clientAllowedFormats: ["jpg", "png"],
			multiple: true,
			sources: ["local"],
			maxFiles: 6,
			folder: "productos_clientes",
		},
		(error, result) => {
			if (!error && result && result.event === "success") {
				// recibirURL(result.info.url)
				urlsImages.push(result.info.url);
				recibirURL(urlsImages);
			}
		}
	);

	const openingWidget = () => {
		myWidget.open();
	};

	return (
		<button onClick={openingWidget} className='learn-more'>
			Sube las imagenes del producto
		</button>
	);
};
