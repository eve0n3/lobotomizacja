import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function UsersRankingTableBody({ users }) {
  const mapRows = () => {
    return users.map((user, id) => {
      return (
        <TableRow key={user.id || user.nazwa}>
          <TableCell>{id + 1}</TableCell>
          <TableCell>{user.nazwa}</TableCell>

          <TableCell>
            <Rating
              name="read-only"
              value={Number(user.avgocena)}
              precision={0.1}
              readOnly
            />
          </TableCell>
          <TableCell>{user.liczba_ocen}</TableCell>
        </TableRow>
      );
    });
  };
  return <TableBody>{mapRows()}</TableBody>;
}

export default UsersRankingTableBody;
