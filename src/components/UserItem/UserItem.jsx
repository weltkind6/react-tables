import { useState, useEffect } from 'react';
import {sortingUsers, isBlockedSorting} from "../../helpers/helpers";
import EditUserForm from "../EditUserForm/EditUserForm";
import UserList from "../UserList/UserList";
import axios from 'axios';
import {apiLink} from "../../shared/api";

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
        axios.get(apiLink)
            .then(response => setUsers(response.data))
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleUserSelect = (user) => {
        setSelectedUsers(user);
    };

    const handleUserUpdate = (user) => {
        axios.put(`${apiLink}/${user.id}`, user)
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
        axios.delete(`${apiLink}/${user.id}`)
            .then(response => {
                const updatedUsers = users.filter(u => u.id!== user.id);
                setUsers(updatedUsers);
                setSelectedUsers(null);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <UserList
                users={users}
                filteredUsers={filteredUsers}
                onUserSelect={handleUserSelect}
                onDelete={handleUserDelete}
                onSort={sortingUsers}
                filteredHandler={handleFilter}
                handleResetFilter={handleResetFilter}
                setSortingToggle={setSortingToggle}
                sortingToggle={sortingToggle}
                isBlockedSorting={isBlockedSorting}
            />
            {selectedUsers &&
                <EditUserForm
                    user={selectedUsers}
                    onSubmit={handleUserUpdate}
                    onClose={() => setSelectedUsers(null)}
                />}
        </div>
    );
}

export default App;
