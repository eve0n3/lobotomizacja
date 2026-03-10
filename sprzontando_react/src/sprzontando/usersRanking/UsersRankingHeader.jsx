import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function UsersRankingHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Nazwa użytkownika</TableCell>
        <TableCell>Miasto</TableCell>
        <TableCell>Ocena</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default UsersRankingHeader;
