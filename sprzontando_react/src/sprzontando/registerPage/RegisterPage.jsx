import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RegisterForm from "./RegisterForm";
import "../../styles/App.css";

function RegisterPage() {
  return (
    <div className="login-page">
      <Container maxWidth="sm" className="login-container">
        <Typography variant="h4">Rejestracja</Typography>
        <RegisterForm></RegisterForm>
      </Container>
    </div>
  );
}

export default RegisterPage;
