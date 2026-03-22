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
        <TableRow>
          <TableCell>{id + 1}</TableCell>
          <TableCell>{user.nazwa}</TableCell>

          <TableCell>
            <Rating
              name="read-only"
              value={user.avgocena}
              precision={0.1}
              readOnly
            />
          </TableCell>
        </TableRow>
      );
    });
  };
  return <TableBody>{mapRows()}</TableBody>;
}

export default UsersRankingTableBody;
