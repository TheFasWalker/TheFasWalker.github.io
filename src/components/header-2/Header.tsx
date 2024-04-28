import React, { useEffect, useState } from "react";
import cl from './header.module.scss'
import { NavLink } from "react-router-dom";
import { PopupWrapper } from "../PopupWrapper/PopupWrapper";
import { useSelector,useDispatch } from "react-redux";
import { RootState, } from "src/store";
import {authLogIn, authLogOut} from '../../store/authSlise'
import { Field, Form, Formik } from "formik";
import {addOperartion,removeOperation} from '../../store/dataSlise'
import { fetchData } from "src/client/fetch";
import { AuthResult, Params, SignUpBody } from "src/client/types";
import { getCookie } from "../helpers/cookies";

const registretionData = {
    login: 'login42@login.login',
    password: 'login',
    commandId:'aasd12312312312312361542349182712178939187212478qw3'
}
const registretionData2 = {
    login: 'test42@test.test',
    password: 'login'
}



export const Header = () => {
    const authState = useSelector((state: RootState) => state.auth.login)
    const dispatch = useDispatch()
    const [loginPopupState, setLoginPopupState] = useState(false);

    const registration = (email: string, password: string, commandId?: string) => {
        const registrationData = {
            email: `${email}`,
            password: `${password}`,
            commadId:`${commandId}`
        }
        fetchData<AuthResult>('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData),
        }).then((res) => {
            dispatch({ type: 'data', payload: res })
            document.cookie = `loginAuth=${res.token}`
            dispatch(authLogIn(res.token))
        }).catch((e)=>console.log(e))
    }
    const login = (email: string, password: string) => {
        const loginData = {
            email: `${email}`,
            password:`${password}`
        }
        fetchData<AuthResult>('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(loginData)
        }).then((res) => {
            dispatch({ type: 'data', payload: res })
            document.cookie = `loginAuth=${res.token}`
            dispatch(authLogIn(res.token))
        }).catch((e)=>console.log(e))
    }
    const LogOutFunc = () => {
        document.cookie = `loginAuth=`
        dispatch(authLogOut())
    }

    useEffect(() => {
        if (getCookie('loginAuth') != '' || null ) {
            dispatch(authLogIn(getCookie('loginAuth')))
        }
    }, [])

    const fetchDataArray = () => {
        fetchData<Params>('/operations', {
            method: "GET",

        })
            .then((res) => {
                dispatch({type:'error', payload: res})
            console.log(res)
        }).catch((e)=> console.log(e))
    }

    return (
        <header className={cl.header}>
            <button onClick={() => fetchDataArray()}>fetch Data</button>
            <button onClick={()=>registration(registretionData2.login, registretionData2.password)}>registration</button>
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
                            setLoginPopupState(!loginPopupState)
                            login(values.userName, values.password)

                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={cl.form}>
                            <span>login: {registretionData2.login }</span>
                            <span>password: {registretionData.password}</span>
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