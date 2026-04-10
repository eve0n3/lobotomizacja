import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { getLoggedUserId } from "../../../utils/utilis";
import OffertTypeSelect from "../Offerts/OffertTypeSelect";

function AddOfferForm() {
  const [title, setTitle] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [price, setPrice] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const userId = getLoggedUserId();

  /* $tytul = $data['tytul']; max 64 
    $miasto = $data['miasto']; max 100 bez znaków specjalnych
    $adres = $data['adres']; max 255 . - /
    $cena = $data['cena']; 
    $kategoria = $data['kategoria']; dropdown 
    $opis = $data['opis']; max 500
    data sql datetime
    id osoby zglasz -> cookie

    wszystko wymagane oprócz opis
    {
    'tytul':"",

    }

    */

  return (
    <Grid>
      <form>
        <TextField
          onChange={(e) =>
            setTitle(e.target.value === "" ? null : e.target.value)
          }
        />
        <OffertTypeSelect type={type} setType={setType} />
        <TextField
          onChange={(e) =>
            setPrice(e.target.value === "" ? null : e.target.value)
          }
        />
        <TextField
          onChange={(e) =>
            setCity(e.target.value === "" ? null : e.target.value)
          }
        />
        <TextField
          onChange={(e) =>
            setAddress(e.target.value === "" ? null : e.target.value)
          }
        />
      </form>
    </Grid>
  );
}

export default AddOfferForm;
