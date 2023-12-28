import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [users, setUsers] = useState([])


    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then(response => setUsers(response.data))
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleUserSelect = (user) => {
        setSelectedUsers(user);
    };

    const handleUserUpdate = (user) => {
        axios.put(`https://jsonplaceholder.typicode.com/posts/${user.id}`, user)
            .then(response => {
                const updatedUsers = users.map(u => u.id === user.id? response.data : u);
                setUsers(updatedUsers);
                setSelectedUsers(null);
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div className="App">
            <h1>Posts</h1>
            <UserList users={users} onUserSelect={handleUserSelect} />
            {selectedUsers &&
                <UserForm
                    user={selectedUsers}
                    onSubmit={handleUserUpdate}
                    onClose={() => setSelectedUsers(null)}
                />}
        </div>
    );
}

function UserList({ users, onUserSelect }) {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Отчество</th>
                    <th>Заблокирован</th>
                    <th>Дата регистрации</th>
                    <th>Был в сети</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.patronymic}</td>
                        <td>{user.isBlocked}</td>
                        <td>{user.regDate}</td>
                        <td>{user.lastSeen}</td>
                        <td>
                            <button onClick={() => onUserSelect(user)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

function UserForm({ user, onSubmit, onClose }) {
    const [name, setName] = useState(user.name);
    const [firstName, setFirstName] = useState(user.firstName);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedUser = {...user, name, firstName };
        onSubmit(updatedUser);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="body">Body:</label>
                <textarea id="body" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
}

export default App;
