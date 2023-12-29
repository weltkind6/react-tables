import {Table} from "reactstrap";
import styles from './styles.module.css';


const UserTable = ({users, onSort, setSorting, sorting, isBlockedSorting, renderUsers}) => {
    return (
        <Table>
            <thead>
            <tr className="table-primary">
                <th onClick={
                    () => onSort(users, "name", setSorting, sorting)}>
                    <span>Имя</span>
                </th>
                <th onClick={
                    () => onSort(users, "lastName", setSorting, sorting)}><span>Фамилия</span></th>
                <th onClick={
                    () => onSort(users, "patronymic", setSorting, sorting)}><span>Отчество</span></th>
                <th onClick={
                    () => onSort(users, "regDate", setSorting, sorting)}><span>Дата регистрации</span></th>
                <th onClick={
                    () => onSort(users, "lastSeen", setSorting, sorting)}><span>Был в сети</span></th>
                <th onClick={
                    () => isBlockedSorting(users, setSorting, sorting)}><span>Заблокирован</span></th>
            </tr>
            </thead>
            <tbody>{renderUsers()}</tbody>
        </Table>
    );
};

export default UserTable;