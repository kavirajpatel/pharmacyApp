
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserListingPage.css";

const UserListingPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length >= 2) {
      const filtered = users.filter((user) => {
        const fullName = `${user.fullName}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      });
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
      if (query.length > 0) {
        alert("Please enter at least 2 characters");
      }
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilteredUsers(users);
  };

  return (
    <div className="UserList_PageWrapper__11jYV">
      <h1 className="user-list-title">Users</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by first or last name"
        />
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile Pic</th>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Current City</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="secondaryColor">{user.id}</td>
              <td>
                <img src={user.profilePic} alt="Profile" />
              </td>
              <td className="secondaryColor">{user.fullName}</td>
              <td className="primaryColor">{user.dob}</td>
              <td className="secondaryColor">{user.gender}</td>
              <td className="secondaryColor">{user.currentCity}, {user.currentCountry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListingPage;
