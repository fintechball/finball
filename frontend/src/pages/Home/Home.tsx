import Pinball from "../Pinball/Pinball";
import styles from "./Home.module.css";
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div id="home-canvas">
        <Pinball />
      </div>
    </div>
  );
}

export default Home;
