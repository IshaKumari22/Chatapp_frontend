import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/api";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChat = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>User List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) =>
          user.id !== parseInt(currentUserId) ? ( // hide current logged-in user
            <li
              key={user.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{user.username}</span>
              <button onClick={() => handleChat(user.id)}>Chat</button>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default UserListPage;
