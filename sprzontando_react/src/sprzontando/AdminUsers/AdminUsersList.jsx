import Box from "@mui/material/Box";
import List from "@mui/material/List";
import AdminUserItem from "./AdminUserItem";

function AdminUsersList({ users, onUserBanned }) {
  return (
    <Box sx={{ mb: 3 }}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {users.map((user) => (
          <AdminUserItem
            key={user.id}
            user={user}
            onUserBanned={onUserBanned}
          />
        ))}
      </List>
    </Box>
  );
}

export default AdminUsersList;
