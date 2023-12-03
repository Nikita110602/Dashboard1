
import React, { useState } from 'react';
import './UserItem.css';

const UserItem = ({ user, onDeleteUser, onEditUser, onSelectRow, isSelected }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedrole, setEditedrole] = useState(user.role);

  const handleSaveEdit = () => {
  
    onEditUser(user.id, { name: editedName, email: editedEmail ,role:editedrole});
    setEditing(false);
  };

  return (
    <tr className={`user-item ${isSelected ? 'selected' : ''}`}>
      <td>{user.id}</td>
      {isEditing ? (
        <>
          <td>
            <input type="text" value={editedName} onChange={e => setEditedName(e.target.value)} />
          </td>
          <td>
            <input type="text" value={editedEmail} onChange={e => setEditedEmail(e.target.value)} />
          </td>
          <td>
            <input type="text" value={editedrole} onChange={e => setEditedrole(e.target.value)} />
          </td>
          <td>
            <button onClick={handleSaveEdit}>Save</button>
          </td>
        </>
      ) : (
        <>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td className='search'>
            <button onClick={() => onDeleteUser(user.id)}>Delete</button>
            <button onClick={() => setEditing(true)}>Edit</button>
          </td>
        </>
      )}
      <td>
        <input type="checkbox" checked={isSelected} onChange={() => onSelectRow(user.id)} />
      </td>
    </tr>
  );
};

export default UserItem;
