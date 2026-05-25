import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function AdminUsersSearch({ onSearch }) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  const handleSearch = () => {
    const filters = {};

    if (username.trim()) {
      filters.username = username;
    }

    if (id.trim()) {
      filters.id = id;
    }

    onSearch(filters);
  };

  const handleClear = () => {
    setUsername("");
    setId("");
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
        onKeyDown={handleKeyPress}
        placeholder="Nazwa użytkownika"
        sx={{ flex: 1, minWidth: 100 }}
      />

      <TextField
        label="ID użytkownika"
        variant="outlined"
        value={id}
        onChange={(e) => setId(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="ID użytkownika"
        sx={{ flex: 1, minWidth: 100 }}
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