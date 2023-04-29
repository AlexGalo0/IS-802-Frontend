import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "./Conversation.css";
import { useQuery } from "@tanstack/react-query";
import { UserMongoContext } from "../../../../context";
export default function Conversation({ conversation, currentUser }) {
  console.log("currentUser", currentUser[0]._id);
  const obtenerTodosLosUsuarios = async () => {
    const res = await axios.get(`http://localhost:4000/usersMongo`);
    return res.data;
  };

  const { data: todosUsuarios } = useQuery({
    queryKey: ["todosUsuarios"],
    queryFn: obtenerTodosLosUsuarios,
  });

  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const friendId = todosUsuarios?.find((m) => m !== currentUser[0]._id);
  //   //console.log("friendId ", friendId);

  //   const getUser = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:4000/user_mongo_id/" + friendId._id);
  //       setUser(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [currentUser, conversation]);

  return (
    <>
      {todosUsuarios?.map((usuario) => (
        <>
          {usuario._id !== UserMongo[0]._id ? (
            <div className="conversation">
              <div onClick={() => setCurrentChat(usuario)}>
                <span className="conversationName">
                  {usuario?.nombres} {usuario?.apellidos}
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ))}
    </>
    // <div className="conversation">
    //   <span className="conversationName">{user?.nombres} {user?.apellidos}</span>
    // </div>
  );
}
