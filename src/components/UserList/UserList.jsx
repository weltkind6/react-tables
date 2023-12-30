import { useState } from "react";
import { Button } from "reactstrap";
import DropDown from "../../widgets/ui/DropDown/DropDown";
import UserTable from "../../widgets/ui/Table/UserTable";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

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
                    <td style={{width: '40px'}}>
                        <FaEdit
                            size={24}
                            color="FFC107"
                            onClick={() => onUserSelect(u)}
                            cursor="pointer"
                            title="Редактировать"
                        />
                    </td>
                    <td>
                        <MdDelete
                            size="33"
                            onClick={() => onDelete(u)}
                            cursor="pointer"
                            color="ff5522"
                            title="Удалить"
                        />
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
                        <FaEdit
                            size={24}
                            color="FFC107"
                            onClick={() => onUserSelect(u)}
                            cursor="pointer"
                            title="Редактировать"
                        />
                    </td>
                    <td>
                        <MdDelete
                            size={24}
                            color="red"
                            cursor="pointer"
                            title="Удалить"
                        />
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
