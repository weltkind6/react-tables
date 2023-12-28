import React from 'react';

const Form = ({name, username, email}) => {
    return (
        <form action="" method="get">
            <p>
                <label htmlFor="name">First name:</label>
                <input type="text" name="name" id="name" />
            </p>
            <p>
                <label htmlFor="name">Last name:</label>
                <input type="text" name="name" id="name" />
            </p>
            <p>
                <label htmlFor="email">Еmail:</label>
                <input type="email" name="email" id="email" />
            </p>
            <button type="submit">Save</button>
        </form>
    );
};

export default Form;