import Pinball from "../Pinball/Pinball";
import styles from "./Home.module.css";
function Home() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <div>
      <h1>Home</h1>
      <div id="home-canvas" style={{width:"360px",height:"360px"}}>
        <Pinball />
      </div>
    </div>
  );
}

export default Home;
