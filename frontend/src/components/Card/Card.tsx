import { useEffect } from "react";
import axios from "axios";

const BASE_HTTP_URL = "http://localhost:8080";


function Card() {

  useEffect(() => {
    axios.get(`${BASE_HTTP_URL}/user/card`);
  }, []);


  return (
    <div>
      <p>Card</p>
    </div>
  );
}

export default Card;
