import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Chip,
  Divider,
  Stack,
  Button,
} from "@mui/material";

import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { getOffersFromDb } from "../../api/getOffersFromDb";

import {
  OF_CITY,
  OF_DATE,
  OF_PRICE,
  OF_TITLE,
  OF_TYPE,
} from "../../../utils/consts";
import ImagePlaceHolder from "../../components/ImagePlaceHolder";

function OfferDetails() {
  const { id } = useParams();

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getOffersFromDb({});

        if (!response.success) {
          throw new Error(response.message || "Błąd pobierania danych");
        }

        const found = response.data.find((o) => String(o.id) === String(id));

        if (!found) {
          throw new Error("Nie znaleziono oferty");
        }

        setOffer(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* NAGŁÓWEK NAD ZDJĘCIEM */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {offer[OF_TITLE]}
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            variant="subtitle1"
            sx={{ textDecoration: "underline", fontWeight: 600, cursor: "pointer" }}
          >
            {offer[OF_CITY]}
          </Typography>
        </Stack>
      </Box>

      {/* GŁÓWNY UKŁAD STRONY */}
      <Grid container spacing={6}>
        
        {/* LEWA KOLUMNA: Zdjęcie + Informacje szczegółowe */}
       
        <Grid item xs={12} md={8}>
          {/* ZDJĘCIE (PLACEHOLDER) */}
          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              borderRadius: 4,
              mb: 4,
              height: { xs: 100, md: 150 },
              width: "100%",
            }}
          >
            <ImagePlaceHolder />
          </Paper>
        {/* PRAWA KOLUMNA: Karta kontaktu (Sticky) */}
        <Grid item xs={12} md={4} >
          <Box
            sx={{
              position: { md: "sticky" },
              top: 100, // Odstęp od góry strony przy przewijaniu
              zIndex: 1,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid #ddd",
                boxShadow: "0px 6px 16px rgba(0,0,0,0.12)",
              }}
            >
              {/* CENA */}
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                {offer[OF_PRICE]} PLN
                <Typography component="span" variant="body1" sx={{ ml: 1, fontWeight: 400 }}>
                  całość
                </Typography>
              </Typography>

              {/* RAMKA Z INFO */}
              <Box sx={{ border: "1px solid #b0b0b0", borderRadius: 2, mb: 2 }}>
                <Box sx={{ p: 1.5, borderBottom: "1px solid #b0b0b0" }}>
                  <Typography sx={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase" }}>
                    Lokalizacja
                  </Typography>
                  <Typography variant="body2">{offer[OF_CITY]}</Typography>
                </Box>
                <Box sx={{ p: 1.5 }}>
                  <Typography sx={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase" }}>
                    Kategoria
                  </Typography>
                  <Typography variant="body2">{offer[OF_TYPE]}</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
          {/* SEKACJA POD ZDJĘCIEM */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Kategoria: {offer[OF_TYPE]}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Lokalizacja oferty: {offer[OF_CITY]}
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* IKONY CECH */}
            <Stack spacing={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CategoryOutlinedIcon sx={{ fontSize: 32 }} color="action" />
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>Typ usługi</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {offer[OF_TYPE]}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <TodayOutlinedIcon sx={{ fontSize: 32 }} color="action" />
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>Data ogłoszenia</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {offer[OF_DATE]}
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            <Divider sx={{ my: 4 }} />

            {/* OPIS */}
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Opis oferty
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.primary", lineHeight: 1.8, whiteSpace: "pre-line" }}
            >
              To jest ogłoszenie z kategorii {offer[OF_TYPE]}, zlokalizowane w miejscowości {offer[OF_CITY]}. 
              Aktualna cena za realizację to {offer[OF_PRICE]} PLN. Zapraszamy do kontaktu w celu 
              ustalenia szczegółowych warunków współpracy.
            </Typography>
          </Box>
        </Grid>

        
      </Grid>
    </Container>
  );
}

export default OfferDetails;