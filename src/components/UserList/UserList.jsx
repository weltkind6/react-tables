import { useState } from "react";
import { Button } from "reactstrap";
import DropDown from "../../widgets/ui/DropDown/DropDown";
import UserTable from "../../widgets/ui/Table/UserTable";

function UserList({
                      users,
                      onUserSelect,
                      onDelete,
                      onSort,
                      filteredHandler,
                      handleResetFilter,
                      isBlockedSorting,
                      filteredUsers,
                      setSortingToggle,
                      sortingToggle
}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) =>!prevState);

    const renderUsers = () => {
        if (filteredUsers.length === 0) {
            return users.map((u) => (
                <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.lastName}</td>
                    <td>{u.patronymic}</td>
                    <td>{u.regDate}</td>
                    <td>{u.lastSeen}</td>
                    <td>{u.isBlocked? "Заблокирован" : "Не заблокирован"}</td>
                    <td>
                        <Button
                            color="warning"
                            onClick={() => onUserSelect(u)}>
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
            ));
        } else {
            return filteredUsers.map((u) => (
                <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.lastName}</td>
                    <td>{u.patronymic}</td>
                    <td>{u.isBlocked? "Заблокирован" : "Не заблокирован"}</td>
                    <td>{u.regDate}</td>
                    <td>{u.lastSeen}</td>
                    <td>
                        <Button
                            color="warning"
                            onClick={() => onUserSelect(u)}>
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
            ));
        }
    };


    return (
        <div>
           <DropDown
               open={dropdownOpen}
               toggle={toggle}
               filter={filteredHandler}
               resetFilter={handleResetFilter}
           />
            <UserTable
                users={users}
                onSort={onSort}
                setSorting={setSortingToggle}
                sorting={sortingToggle}
                isBlockedSorting={isBlockedSorting}
                renderUsers={renderUsers}
            />
        </div>
    );
}
export default UserList;
