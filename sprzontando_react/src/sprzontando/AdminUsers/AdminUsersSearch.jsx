import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function AdminUsersSearch({ onSearch }) {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    const filters = {};
    if (username.trim()) {
      filters.username = username;
    }
    onSearch(filters);
  };

  const handleClear = () => {
    setUsername("");
    onSearch({});
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
      <TextField
        label="Wyszukaj użytkownika"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Nazwa użytkownika"
        sx={{ flex: 1, minWidth: 200 }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{ alignSelf: "center" }}
      >
        Wyszukaj
      </Button>
      <Button
        variant="outlined"
        onClick={handleClear}
        sx={{ alignSelf: "center" }}
      >
        Wyczyść
      </Button>
    </Box>
  );
}

export default AdminUsersSearch;
