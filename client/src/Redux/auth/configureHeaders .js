export const configureHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    //console.log("Token no encontrado en localStorage");
    return {};
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return {
    headers,
  };
};

//Esta funcion extrae el token de localStorage y lo agrega a los headers para ser enviado en el axios
//hay que guardar la respuesta en una variable y luego pasarla como parametro en el axios
//ejemplo: const config= configureHeaders()
//axios.get(url,post,config)
//improtar en otros archivos 
//import { configureHeaders } from "../auth/configureHeaders .js";
