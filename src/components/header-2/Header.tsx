import React, { useEffect, useState } from "react";
import cl from './header.module.scss'
import { NavLink } from "react-router-dom";
import { PopupWrapper } from "../PopupWrapper/PopupWrapper";
import { useSelector,useDispatch } from "react-redux";
import { RootState, } from "src/store";
import {authLogIn, authLogOut} from '../../store/authSlise'
import { Field, Form, Formik } from "formik";
import {addOperartion,removeOperation} from '../../store/dataSlise'
const loginData = {
    'login': 'login',
    'password':'pass'
}


export const Header = () => {
    const authState = useSelector((state: RootState) => state.auth.login)
    const dispatch = useDispatch()
    const cookeyKey = 'asedstrt1w';
    const [loginPopupState, setLoginPopupState] = useState(false);
    const getCookie = (name:string) => {
        let cookies = document.cookie.split('; ').find(row => row.startsWith(name + '='));
        return cookies ? cookies.split('=')[1]:null
    }
    const LogInFunc = () => {
        document.cookie =`loginAuth=${cookeyKey}`
        dispatch(authLogIn())
    }
    const LogOutFunc = () => {
        document.cookie = `loginAuth=`
        dispatch(authLogOut())
    }
    useEffect(() => {
        if (getCookie('loginAuth') == cookeyKey) {
            dispatch(authLogIn())
        }
    })





    return (
        <header className={cl.header}>
            <div className={cl.headerContainer}>
            <NavLink className={cl.logo} to="/">logo</NavLink>
                <ul>
                    {!authState ||
                <li>
                    <NavLink to="/profile"> Профиль</NavLink>
                </li>
                        }
                <li>
                    <NavLink to="/operations"> Операции</NavLink>
                    </li>
                    <li>
                        {!authState ||
                            <NavLink to="/create">Создать операцию</NavLink>
                        }
                </li>
                </ul>
                {authState
                    ?
                        <button className={cl.loginButton} onClick={()=>LogOutFunc()}>LogOut</button>
                    :
                        <button className={cl.loginButton} onClick={()=> setLoginPopupState(!loginPopupState)}>LogIn</button>
                    }
            </div>
            <PopupWrapper
                visible={loginPopupState}
                close={() => setLoginPopupState(!loginPopupState)}>

                <Formik
                    initialValues={{
                        userName: '',
                        password: ''
                    }}
                    onSubmit={values => {
                        console.log(values)
                        if (values.password == loginData.password && values.userName == loginData.login) {
                            console.log('yes')
                            LogInFunc()
                            setLoginPopupState(!loginPopupState)
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={cl.form}>
                            <span>login: {loginData.login }</span>
                            <span>password: {loginData.password}</span>
                            <label>
                                <span>login</span>
                                <Field
                                    name="userName"/>
                            </label>
                            <label>
                                <span>password</span>
                                <Field
                                name="password"/>
                            </label>
                            <button type="submit">Войти</button>
                            </Form>
                    )}

                </Formik>
            </PopupWrapper>
        </header>

    )
}