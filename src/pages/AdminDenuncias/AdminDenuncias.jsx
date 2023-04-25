import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {useState} from "react";
import { obtenerDenuncias , desestimarDenuncia, darBajaDenunciaUsuario} from "../../api";
import { AsideAdmin } from "../../Components/AsideAdmin";
import {
    Container,
    Modal,
    Alert,
  } from "react-bootstrap";
  import { Link, useNavigate } from "react-router-dom";
  import { BiLeftArrow } from "react-icons/bi";
  import "../AdminUsuarios/Style/DashboardAdmin.css";


export const AdminDenuncias = () => {
    const navigate = useNavigate();
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

    const handleRedirection = () => {
        navigate(-1);
      };

	return (
		<>
        <Container fluid className="container-grid">
        <header className="headerCrud" /* style={{ paddingTop: "122px" }} */>
        <AsideAdmin />
        <article
          style={{
            display: "flex",
            justifyContent: "initial",
            alignItems: "center",
            flexDirection: "column",
            padding: "10px",
            width: "100%",
            marginLeft: '249px'
          }}
        >
            <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "10px",
            }}
          >
            <button
              className="Button-back"
              type="submit"
              onClick={handleRedirection}
            >
              <BiLeftArrow />
            </button>

            <h1 style={{ marginTop: "-8px" }}>Denuncias de usuarios:</h1>
          </div>
          <Container className="conCrud">
          <div className="container-table" /* style={{border: '1px solid black'}} */>
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
					<th>Motivo de denuncia</th>
					{/* <th>Desestimar Denuncia</th>
					<th>Dar de baja a denunciado</th> */}
				</tr>
				<tbody>
					{denuncias?.map((denuncia, index) => (
						
							<tr key={index} style={{
                                height: "50px",
                                borderBottom: "1px solid black",
                                gap: "10px",
                              }}>
								<td style={{ width: "200px" }}>{denuncia.denunciado}</td>
								<td style={{ width: "200px" }}>{denuncia.denunciante}</td>
                                <td>{denuncia.descripcion}</td>
                                <div style={{ display: "flex", gap: "5px" }}>
                                    <button onClick={()=>{
                                        handleDesestimar(denuncia.id_denuncia.data.toString())
                                    }} 
                                    className="buttonEdiBo"
                                    style={{
                                      color: "#f7f7f7",
                                      fontSize: "medium",
                                      width: "105px",
                                    }}>
                                        <span className="box">Desestimar</span>
                                    </button>
                                
                                    <button onClick={()=>{
                                        handleDarBaja(denuncia.id_denuncia.data.toString())
                                    }}
                                    className="buttonEdiBo"
                            style={{
                              color: "#f7f7f7",
                              fontSize: "medium",
                              width: "145px",
                            }}>
                                        <span className="box">Dar de baja</span>
                                    </button>
                                    </div>
							</tr>
						
					))}
				</tbody>
			</table>
            </div>
            </Container>
            </article>
            </header>
            </Container>
		</>
	);
};
