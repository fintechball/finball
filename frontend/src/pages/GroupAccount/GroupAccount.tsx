import * as React from 'react';
import styles from "./GroupAccount.module.css"
import Pinball from "../Pinball/Pinball";

const GroupAccount = () => {
 

  return (
    <div>
        <div id="home-canvas" style={{ width: "300px", height: "150px" }}>
          <Pinball />
        </div>
    </div>
  );
}

export default GroupAccount;
