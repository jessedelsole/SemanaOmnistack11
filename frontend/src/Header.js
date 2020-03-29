import React from 'react';

export default function Header( { children } ){ //props){
    return (
        //<header>
        //    <h1>{props.title} - Be the Hero</h1>
        //</header>
        <header>
            <h1> {children} </h1>
        </header>

    );
}
