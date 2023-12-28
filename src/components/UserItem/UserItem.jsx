import { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

function App() {
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [users, setUsers] = useState([])
    const [sortingToggle, setSortingToggle] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([])


    const handleFilter = () => {
        const filteredArr = users.filter(obj => obj.isBlocked === true);
        setFilteredUsers(filteredArr);
    }
    const handleResetFilter = () => {
        setFilteredUsers(users);
    }



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
        axios.put(`http://localhost:3001/users/${user.id}`, user)
            .then(response => {
                const updatedUsers = users.map(u => u.id === user.id? response.data : u);
                setUsers(updatedUsers);
                setSelectedUsers(null);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleUserDelete = (user) => {
        console.log('delete')
        axios.delete(`http://localhost:3001/users/${user.id}`)
            .then(response => {
                const updatedUsers = users.filter(u => u.id!== user.id);
                setUsers(updatedUsers);
                setSelectedUsers(null);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const sortingUsers = (sortKey) => {
        setSortingToggle(!sortingToggle);
        if (sortingToggle) {
            users.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
        } else {
            users.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
        }
    }

    return (
        <div className="App">
            <UserList
                users={filteredUsers}
                onUserSelect={handleUserSelect}
                onDelete={handleUserDelete}
                onSort={sortingUsers}
                filteredHandler={handleFilter}
                handleResetFilter={handleResetFilter}
            />
            {selectedUsers &&
                <UserForm
                    user={selectedUsers}
                    onSubmit={handleUserUpdate}
                    onClose={() => setSelectedUsers(null)}
                />}
        </div>
    );
}

function UserList(
    {users, onUserSelect, onDelete, onSort, filteredHandler, handleResetFilter}) {
    console.log('resetFilter', handleResetFilter)

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div>
            <button onClick={filteredHandler}>Filter</button>
            <button>Reset</button>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                <DropdownToggle caret>Фильтрация</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>По:</DropdownItem>
                    <DropdownItem onClick={handleResetFilter}>Сбросить фильтр</DropdownItem>
                    <DropdownItem onClick={filteredHandler}>По блокировке</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <table>
                <thead>
                <tr>
                    <th onClick={() => onSort('name')}>Имя</th>
                    <th onClick={() => onSort('lastName')}>Фамилия</th>
                    <th onClick={() => onSort('patronymic')}>Отчество</th>
                    <th onClick={() => onSort('isBlocked')}>Заблокирован</th>
                    <th onClick={() => onSort('regDate')}>Дата регистрации</th>
                    <th onClick={() => onSort('lastSeen')}>Был в сети</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.lastName}</td>
                        <td>{u.patronymic}</td>
                        <td>{u.isBlocked}</td>
                        <td>{u.regDate}</td>
                        <td>{u.lastSeen}</td>
                        <td>
                            <Button
                                onClick={() =>
                                    onUserSelect(u)}>
                                Редактировать
                            </Button>
                        </td>
                        <td>
                            <Button
                                color="danger"
                                onClick={() => onDelete(u)}>
                                Удалить
                            </Button>
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
    const [lastName, setLastName] = useState(user.lastName);
    const [patronymic, setPatronymic] = useState(user.patronymic);
    const [isBlocked, setIsBlocked] = useState(user.isBlocked);
    const [regDate, setRegDate] = useState(user.regDate);
    const [lastSeen, setLastSeen] = useState(user.lastSeen);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedUser =
            {...user,
                name,
                lastName,
                patronymic,
                isBlocked,
                regDate,
                lastSeen
            };
        onSubmit(updatedUser);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Имя:</label>
                <input type="text" id="title" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="body">Фамилия:</label>
                <textarea id="body" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="body">Body:</label>
                <textarea id="body" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
            </div>
            <div>
                <label htmlFor="body">Body:</label>
                <textarea id="body" value={isBlocked} onChange={(e) => setIsBlocked(e.target.value)} />
            </div>
            <div>
                <label htmlFor="body">Body:</label>
                <textarea id="body" value={regDate} onChange={(e) => setRegDate(e.target.value)} />
            </div>
            <div>
                <label htmlFor="body">Body:</label>
                <textarea id="body" value={lastSeen} onChange={(e) => setLastSeen(e.target.value)} />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
}

export default App;
