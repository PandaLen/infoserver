import React from 'react';
import './footer.css';

export const Footer = (props) => {
    const { copyright } = props;
    let year = new Date().getFullYear();

    return (
        <footer className='mt-3 p-3 text-center'>
            <p className='copyright'>&copy; { year } - { copyright.projectName } - autor: <b>{ copyright.projectAuthor }</b></p>
        </footer>
    );
}