import React from 'react'

const UserTable =({users,editRow,deleteUser}) => {

  
  
  return  (  
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
      
      
      users.length > 0 ? (

        users.map(user => { 

          // const user = [users]
          console.log(user)
         
          return(
          
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button
                onClick={() => {
                  editRow(user)
                }}
                className="button"
              >
                Edit
                {console.log(user)}
              </button>
              <button
                onClick={() => deleteUser(user._id)}
                className="button "
              >
                Delete
              </button>
            </td>
          </tr>
        )})
              ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
)}

export default UserTable