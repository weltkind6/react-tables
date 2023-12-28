export const sortingUsers = (data, sortKey, setToggle, toggle) => {
    setToggle(!toggle);
    if (toggle) {
        data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    } else {
        data.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
    }
}

export const isBlockedSorting = (data, setToggle, toggle) => {
    setToggle(!toggle)
    if (toggle) {
        data.sort((a, b) => a.isBlocked - b.isBlocked)
    } else {
        data.sort((a, b) => b.isBlocked - a.isBlocked)
    }
}