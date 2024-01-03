import React, {useState} from 'react';
import {Button, Input} from "reactstrap";
import styles from './styles.module.css';

const Modal = ({active, setActive, onClose, onSubmit, user}) => {
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.lastName);
    const [patronymic, setPatronymic] = useState(user.patronymic);
    const [isBlocked, setIsBlocked] = useState(user.isBlocked);
    const [regDate, setRegDate] = useState(user.regDate);
    const [lastSeen, setLastSeen] = useState(user.lastSeen);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedUser =
            {
                ...user,
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
        <form
            className={`${styles.modal} ${active? styles.active : ''}`}
            onClick={() => setActive(false)}
            onSubmit={handleSubmit}
        >
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}

            >
                <div>
                    <label
                        htmlFor="title"
                        className={styles.label}>Имя:
                    </label>
                    <Input
                        type="text"
                        id="title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="body"
                        className={styles.label}>Фамилия:
                    </label>
                    <Input
                        id="body"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="body" className={styles.label}>Отчество:</label>
                    <Input
                        id="body"
                        value={patronymic}
                        onChange={(e) => setPatronymic(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="body"
                        className={styles.label}>Заблокирован:
                    </label>
                    <Input
                        id="body"
                        value={isBlocked ? "Заблокирован" : "Не заблокирован"}
                        onChange={(e) => setIsBlocked(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="body"
                        className={styles.label}>Дата регистрации:
                    </label>
                    <Input
                        id="body"
                        value={regDate}
                        onChange={(e) => setRegDate(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="body"
                        className={styles.label}>Последний визит:
                    </label>
                    <Input
                        id="body"
                        value={lastSeen}
                        onChange={(e) => setLastSeen(e.target.value)}
                    />
                </div>
                <div className={styles.btnBlock}>
                    <Button
                        color="success"
                        type="submit">
                        Сохранить
                    </Button>
                    <Button
                        onClick={onClose}
                        className={styles.cancelBtn}
                        color="danger"
                        type="button">
                        Отмена
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default Modal;
