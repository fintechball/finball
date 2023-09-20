import { useState } from "react";
import styles from "./SignUp.module.css";
import finballImage from "../../assets/Logo.png";
// import { Button } from 'react-bootstrap';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { OutlinedInput, Button } from "@material-ui/core";
import { relative } from "path";

import SignUpForm from "../../components/Auth/SignUpForm";

function Signup() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}

export default Signup;
