import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HOME_LOCATION } from "../../../utils/consts";
import { getLoggedUserId, isLoggedUserAdmin } from "../../../utils/utilis";
import {
  banUser,
  getLowRatedUsers,
  getOfferReports,
  resolveOfferReport,
  searchUsersStats,
} from "../../api/adminApi";

function ReportsTab({ adminId, refreshKey, onChanged }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await getOfferReports(adminId);
      setReports(result.success ? result.data || [] : []);
      setLoading(false);
    };
    load();
  }, [adminId, refreshKey]);

  const resolve = async (reportId, decision) => {
    await resolveOfferReport({ adminId, reportId, decision });
    onChanged();
  };

  if (loading) return <CircularProgress />;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Ogloszenie</TableCell>
          <TableCell>Zglaszajacy</TableCell>
          <TableCell>Powod</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Akcje</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.tytul}</TableCell>
            <TableCell>{report.zglaszajacy}</TableCell>
            <TableCell>{report.powod || "brak"}</TableCell>
            <TableCell>
              <Chip size="small" label={report.status} />
            </TableCell>
            <TableCell>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  disabled={report.status !== "new"}
                  onClick={() => resolve(report.id, "ban")}
                >
                  Banuj
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={report.status !== "new"}
                  onClick={() => resolve(report.id, "ok")}
                >
                  Jest ok
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function LowRatedTab({ adminId, refreshKey, onChanged }) {
  const [users, setUsers] = useState([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await getLowRatedUsers(adminId);
      setUsers(result.success ? result.data || [] : []);
      setLoading(false);
    };
    load();
  }, [adminId, refreshKey]);

  const ban = async (userId) => {
    await banUser({ adminId, userId, days });
    onChanged();
  };

  if (loading) return <CircularProgress />;

  return (
    <Stack spacing={2}>
      <TextField
        label="Dni bana"
        type="number"
        value={days}
        onChange={(event) => setDays(Number(event.target.value))}
        sx={{ maxWidth: 180 }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Uzytkownik</TableCell>
            <TableCell>Srednia</TableCell>
            <TableCell>Liczba ocen</TableCell>
            <TableCell>Ban do</TableCell>
            <TableCell>Akcje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.nazwa}</TableCell>
              <TableCell>{user.avgocena}</TableCell>
              <TableCell>{user.completed_count}</TableCell>
              <TableCell>{user.ban_end || "-"}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => ban(user.id)}
                >
                  Ban czasowy
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}

function UserSearchTab({ adminId }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await searchUsersStats({ adminId, query });
    setUsers(result.success ? result.data || [] : []);
    setLoading(false);
  };

  return (
    <Stack spacing={2}>
      <Stack component="form" direction="row" spacing={1} onSubmit={search}>
        <TextField
          label="Nazwa, email lub ID"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={loading || !query}>
          Szukaj
        </Button>
      </Stack>
      {loading && <CircularProgress />}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Uzytkownik</TableCell>
            <TableCell>Konto od</TableCell>
            <TableCell>Ogloszenia</TableCell>
            <TableCell>Zbanowane ogloszenia</TableCell>
            <TableCell>Wykonania</TableCell>
            <TableCell>Srednia</TableCell>
            <TableCell>Ban do</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                {user.nazwa}
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </TableCell>
              <TableCell>{user.utworzenie || "-"}</TableCell>
              <TableCell>{user.created_count}</TableCell>
              <TableCell>{user.banned_count}</TableCell>
              <TableCell>{user.completed_count}</TableCell>
              <TableCell>{user.avgocena}</TableCell>
              <TableCell>{user.ban_end || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const adminId = getLoggedUserId();
  const [tab, setTab] = useState("reports");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isLoggedUserAdmin()) {
      navigate(HOME_LOCATION);
    }
  }, [navigate]);

  if (!isLoggedUserAdmin()) {
    return <Alert severity="error">Brak dostepu.</Alert>;
  }

  const refresh = () => setRefreshKey((value) => value + 1);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Panel admina
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
          <Tab value="reports" label="Zgloszenia" />
          <Tab value="lowRated" label="Niskie oceny" />
          <Tab value="search" label="Statystyki UZ" />
        </Tabs>
        {tab === "reports" && (
          <ReportsTab adminId={adminId} refreshKey={refreshKey} onChanged={refresh} />
        )}
        {tab === "lowRated" && (
          <LowRatedTab adminId={adminId} refreshKey={refreshKey} onChanged={refresh} />
        )}
        {tab === "search" && <UserSearchTab adminId={adminId} />}
      </Paper>
    </Box>
  );
}

export default AdminDashboard;
