import React, { useEffect, useState } from "react";
import cl from './header.module.scss'
import { NavLink } from "react-router-dom";
import { PopupWrapper } from "../PopupWrapper/PopupWrapper";
import { useSelector,useDispatch } from "react-redux";
import { RootState, } from "src/store";
import {authLogIn, authLogOut} from '../../store/authSlise'
import { Field, Form, Formik } from "formik";
import { addOperartion, removeOperation } from '../../store/dataSlise'
import { fetchData } from "src/client/fetch";
import { AuthResult } from "src/client/types";
import { getCookie, writeСookies } from "../Helpers/cookiesFunctions";

const loginData = {
    'login': 'test42@test42.test',
    'password': 'qwerasdf',
    'commandId':'3219871365asd4f95519aas98df'
}


export const Header = () => {
    const authState = useSelector((state: RootState) => state.auth.login)
    const dispatch = useDispatch()
    const [loginPopupState, setLoginPopupState] = useState(false);



    const logIn = (login: string, password: string) => {
        const data = {
            email: `${login}`,
            password: `${password}`
        }
        fetchData<AuthResult>('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        }).then((res) => {
            dispatch({ type: 'error', payload: res })
            writeСookies('loginAuth',res.token)
            dispatch(authLogIn(res.token))
        }).catch(e=>console.log(e))
    }

    const registration = (login: string, password: string, commandId?: string) => {
        const data = {
            email: `${login}`,
            password: `${password}`,
            commandId: `${commandId}`
        }
        fetchData<AuthResult>('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => {
            dispatch({ type: 'error', payload: 'res' })
            writeСookies('loginAuth', res.token)
            console.log(res.token)
        }).catch(e => console.log(e))
    }

    const logOut = () => {
        document.cookie = `loginAuth=`
        dispatch(authLogOut())
    }

    useEffect(() => {
        if (getCookie('loginAuth')) {
            dispatch(authLogIn(getCookie('loginAuth')))
        }
    })

    return (
        <header className={cl.header}>
            <button onClick={()=>registration(loginData.login, loginData.password, loginData.commandId)}>registration</button>
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
                        <button className={cl.loginButton} onClick={()=>logOut()}>LogOut</button>
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
                        logIn(values.userName,values.password)
                        setLoginPopupState(!loginPopupState)

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