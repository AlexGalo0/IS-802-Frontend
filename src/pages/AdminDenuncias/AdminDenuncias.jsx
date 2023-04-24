import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {useState} from "react";
import { obtenerDenuncias , desestimarDenuncia, darBajaDenunciaUsuario} from "../../api";
export const AdminDenuncias = () => {
    const queryClient  = useQueryClient()
	const { data: denuncias } = useQuery({
		queryKey: ["denuncias"],
		queryFn: obtenerDenuncias,
	});

    const mutationDesestimar = useMutation({
        mutationFn: (idDesestimar) => {
            desestimarDenuncia(idDesestimar)
        },
        onSuccess: () => {
            queryClient.invalidateQueries("denuncias")
        }
    })

    const mutationDarBaja= useMutation({
        mutationFn: (idDenuncia) => {
            darBajaDenunciaUsuario(idDenuncia)
        },
        onSuccess: () => {
            queryClient.invalidateQueries("denuncias")
            queryClient.invalidateQueries("usuarios")

        }
    })

    const handleDesestimar = (idDesestimar) => {
        mutationDesestimar.mutate(idDesestimar)

    }
    const handleDarBaja = (idDenuncia) => {
        mutationDarBaja.mutate(idDenuncia)
    }

	return (
		<>
			<h1>Denuncias de Usuarios</h1>
			<table>
				<tr
					style={{
						width: "20%",
						borderBottom: "1px solid black",
						fontSize: "large",
						gap: "10px",
					}}
				>
					<th>Denunciado</th>
					<th>Denunciante</th>
					<th>Motivo de Denuncia</th>
					<th>Desestimar Denuncia</th>
					<th>Dar de baja a denunciado</th>
				</tr>
				<tbody>
					{denuncias?.map((denuncia, index) => (
						
							<tr key={index}>
								<td>{denuncia.denunciado}</td>
								<td>{denuncia.denunciante}</td>
                                <td>{denuncia.descripcion}</td>
                                <td>
                                    <button onClick={()=>{
                                        handleDesestimar(denuncia.id_denuncia.data.toString())
                                    }}>
                                        Desestimar
                                    </button>
                                </td>
                                <td>
                                    <button onClick={()=>{
                                        handleDarBaja(denuncia.id_denuncia.data.toString())
                                    }}>
                                        Dar de baja a denunciado
                                    </button>
                                </td>
							</tr>
						
					))}
				</tbody>
			</table>
		</>
	);
};
