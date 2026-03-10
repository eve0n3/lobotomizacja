import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function UsersRankingTableBody({ users }) {
  const mapRows = () => {
    return users.map((user, id) => {
      return (
        <TableRow>
          <TableCell>{id}</TableCell>
          <TableCell>{user.nazwa}</TableCell>
          <TableCell>{user.miasto}</TableCell>
          <TableCell>{user.ocena}</TableCell>
        </TableRow>
      );
    });
  };
  return <TableBody>{mapRows()}</TableBody>;
}

export default UsersRankingTableBody;
