
import React, { useEffect, useState } from 'react';
import UserItem from './UserItem';
import './UserList.css'

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {

    const filtered = users.filter(user =>
      Object.values(user).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); 
  }, [searchTerm, users]);

  const handleDeleteUser = userId => {
   
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleEditUser = (userId, updatedUserData) => {
    
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, ...updatedUserData } : user
    );
    setUsers(updatedUsers);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleSelectRow = userId => {
    setSelectedRows(prevSelectedRows => {
      if (prevSelectedRows.includes(userId)) {
      
        return prevSelectedRows.filter(id => id !== userId);
      } else {
        
        return [...prevSelectedRows, userId];
      }
    });
  };

  const handleDeleteSelected = () => {
    
    const updatedUsers = users.filter(user => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='search-container'>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table>
        <thead>
          <tr className='tri'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
            <th>Select</th>

          </tr>
        </thead>
        <tbody>
          {currentItems.map(user => (
            <UserItem
              key={user.id}
              user={user}
              onDeleteUser={handleDeleteUser}
              onEditUser={handleEditUser}
              onSelectRow={handleSelectRow}
              isSelected={selectedRows.includes(user.id)}
            />
          ))}
        </tbody>
      </table>
      <div className='manage-page'>
        <button onClick={() => handlePageChange(1)}>First Page</button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastItem >= filteredUsers.length}
        >
          Next Page
        </button>
        <button onClick={() => handlePageChange(Math.ceil(filteredUsers.length / itemsPerPage))}>
          Last Page
        </button>
      </div>
      <button className='delete' onClick={handleDeleteSelected}>Delete Selected</button>
    </div>
  );
};

export default UserList;
