import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function UsersRankingTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Pozycja</TableCell>
        <TableCell>Nazwa uzytkownika</TableCell>
        <TableCell>Ocena</TableCell>
        <TableCell>Liczba ocen</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default UsersRankingTableHead;
