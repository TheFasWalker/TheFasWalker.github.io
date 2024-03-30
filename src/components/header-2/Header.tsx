import React from "react";
import cl from './header.module.scss'
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <header className={cl.header}>
            <div className={cl.headerContainer}>
            <NavLink className={cl.logo} to="/">logo</NavLink>
                <ul>
                <li>
                    <NavLink to="/profile"> Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/operations"> Operationse</NavLink>
                </li>
                <li>
                    <NavLink to="/*"> error</NavLink>
                </li>
            </ul>
            </div>

            </header>

    )
}