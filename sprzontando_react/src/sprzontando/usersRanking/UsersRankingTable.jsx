import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import UsersRankingTableHead from "./UsersRankingHeader";
import UsersRankingTableBody from "./UsersRankingTableBody";

function UsersRankingTable({ users }) {
  return (
    <Table>
      <UsersRankingTableHead />
      <UsersRankingTableBody users={users} />
    </Table>
  );
}

export default UsersRankingTable;
