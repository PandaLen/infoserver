import React from 'react';
import './header.css';

export const Header = (props) => {
    const { title, motto } = props;

    return (
        <header className='p-5 text-center'>
            <h1 className='display-2 text-white'>{ title }</h1>
            { motto &&
                <small style={{fontSize: '30px', color: '#aaa', borderTop: '1px solid #aaa', textTransform: 'uppercase'}}>{ motto }</small>
            }
        </header>
    );
}