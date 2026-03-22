import Container from "@mui/material/Container";
import LoginForm from "./LoginForm";
import Typography from "@mui/material/Typography";

import "../../styles/App.css";
import Button from "@mui/material/Button";

function LoginPage() {
  return (
    <div className="login-page">
      <Container maxWidth="sm" className="login-container">
        <Typography variant="h4">Logowanie</Typography>
        <LoginForm></LoginForm>
      </Container>
    </div>
  );
}

export default LoginPage;
