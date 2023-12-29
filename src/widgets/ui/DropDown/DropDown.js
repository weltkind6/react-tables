import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

const DropDown = ({open, toggle, filter, resetFilter}) => {
    return (
        <Dropdown isOpen={open} toggle={toggle} style={{margin: "10px 0 10px 0"}}>
            <DropdownToggle color="primary" caret>Фильтрация</DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>По:</DropdownItem>
                <DropdownItem onClick={resetFilter}>Сбросить фильтр</DropdownItem>
                <DropdownItem onClick={filter}>По блокировке</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropDown;