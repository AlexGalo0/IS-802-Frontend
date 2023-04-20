import { useRef, useEffect, useState } from "react";
import "../../../style/styleForm.css";

export const CloudinaryUploadWidget = ({recibirURL}) => {
	const urlImages=[] ;
	const cloudinaryRef = useRef();
	const widgetRef = useRef();

	const [maxFiles,setMaxFiles] = useState(6)

	const [disabledButton, setDisabledButton] = useState (false)


	
	useEffect(() => {
		cloudinaryRef.current = window.cloudinary;
		widgetRef.current = cloudinaryRef.current.createUploadWidget(
			{
				cloudName: "djnzoyal5",
				uploadPreset: "preset_pabs",
				theme: "blue",
				clientAllowedFormats: ["jpg", "png", "jpeg", "webp"],
				multiple: true,
				sources: ["local"],
				maxFiles,
				folder: "productos_clientes",

				language: "es",
				text: {
					es: {
						or: "Ó",
						back: "Regresar",
						advanced: "Avanzado",
						close: "Cerrar",
						no_results: "Sin resultados",
						search_placeholder: "Buscar archivos",
						about_uw: "Acerca de Upload Widget",
						menu: {
							files: "Mis archivos",
						},
						local: {
							browse: "Buscar",
							dd_title_single: "Arrastra y suelta tu archivo aquí",
							dd_title_multi: "Arrastra y suelta archivos aquí",
							drop_title_single: "Arrastra y suelta un archivo para cargarlo",
							drop_title_multiple: "Arrastra y suelta archivos para cargarlos",
						},
						queue: {
							title: "Fila de carga",
							title_uploading_with_counter: "Cargando {{num}} elementos",
							title_uploading: "Cargando elementos",
							mini_title: "Cargados",
							mini_title_uploading: "Cargado",
							show_completed: "Mostrar completado",
							retry_failed: "Reintento fallido",
							abort_all: "Cancelar todos",
							upload_more: "Cargar mas",
							done: "Listo",
							mini_upload_count: "{{num}} cargados",
							mini_failed: "{{num}} fallidos",
							statuses: {
								uploading: "Cargando…",
								error: "Error",
								uploaded: "Listo",
								aborted: "Cancelado",
							},
						},
					},
				},
			},
			function (error, result) {
				if(!error && result && result.event==="success") {
					urlImages.push(result.info.url)
					setMaxFiles(6-urlImages.length)
					
					recibirURL(urlImages)
					if(urlImages.length===6){
						setDisabledButton(true)
					}
					
					
				}
					
			}
		);
	}, [maxFiles]);



	return (
		<button
			onClick={() => {
				widgetRef.current.open();
			}}
		disabled={disabledButton}
		className='learn-more'
		>
			Subir Imágenes
		</button>
	);
};