import Container from "@mui/material/Container";
import RegisterForm from "./RegisterForm";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SuccessVerification() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <Container 
    maxWidth={false}
    sx={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
    }}>
      <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "white",
        borderRadius: 3,
        boxShadow: 3,
        p: 5,
      }}
    >
      <Typography 
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 3,
        }}>Pomyślnie zweryfikowano !</Typography>
      <Typography
        sx={{
          textAlign: "center",
          mb: 1,
          fontSize: "1.2rem",
        }}>Kliknij przycisk aby przejść na stronę logowania</Typography>
      <Button fullWidth
        variant="contained"
        size="large"
        onClick={handleClick}
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontWeight: "bold",
        }}>zaloguj się</Button>

      </Container>
    </Container>
    
  );
}

export default SuccessVerification;
