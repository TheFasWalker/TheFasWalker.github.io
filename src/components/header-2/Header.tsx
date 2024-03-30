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
                    <NavLink to="/profile"> Профиль</NavLink>
                </li>
                <li>
                    <NavLink to="/operations"> Операции</NavLink>
                </li>
                <li>
                    <NavLink to="/*"> 404</NavLink>
                </li>
            </ul>
            </div>

            </header>

    )
}