import React, { useState, useEffect, Fragment } from 'react';
import './App.css'
import axios from 'axios'
import AddUserForm from './components/AddUserForm'
import EditUserForm from './components/EditUserForm'
import UserTable from './components/UserTable'

const App = () => {
	const [users, setUsers] = useState([]);
	const [state, setState] = useState(false);
	const initialFormState = { id: null, name: '', email: '' };
	const [currentUser, setCurrentUser] = useState(initialFormState);
	const [editing, setEditing] = useState(false);
	const getData = () => {
		axios.get("https://social-media-apps7.herokuapp.com/employeedata")
			.then((res) => {
				const data = res.data;
				setUsers(data)
				setState(true)
			})
			.catch((error) => alert(`${error}`))
	}
	useEffect(() => {

		getData()

	}, []);


	const addUser = user => {
		console.log(user)
		setUsers([...users, user])
		axios.post("https://social-media-apps7.herokuapp.com/employeedata", user)
			.then(() => getData())
	}

	const deleteUser = id => {
		console.log(id)
		axios.delete(`https://social-media-apps7.herokuapp.com/employeedata/${id}`)
		const data = users.filter(datas => datas._id !== id);
		setUsers(data)
		setEditing(false)
	}

	const updateUser = (id, updatedUser) => {
		axios.patch(`https://social-media-apps7.herokuapp.com/employeedata/${id}`, updatedUser)
			.then(() => getData())
		const user = users.map(user => user._id !== id ? user : updatedUser)
		setUsers(user)
		setEditing(false);
	}

	const editRow = user => {
		setEditing(true)
		setCurrentUser({ id: user._id, name: user.name, email: user.email })
	}

	return (
		<div className="container">
			<h1>Employee Details</h1>
			<div className="flex-row">
				<div className="flex-small">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					{state && <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />}
				</div>
			</div>
		</div>
	)
}

export default App
