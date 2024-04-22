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
import { SignUpBody, User,AuthResult, Filters, Operations } from "src/client/types";



export const Header = () => {
    const authState = useSelector((state: RootState) => state.auth.login)
    const dispatch = useDispatch()

    const [loginPopupState, setLoginPopupState] = useState(false);
    const getCookie = (name:string) => {
        let cookies = document.cookie.split('; ').find(row => row.startsWith(name + '='));
        return cookies ? cookies.split('=')[1]:null
    }

    const LogOutFunc = () => {
        document.cookie = `loginAuth=`
        dispatch(authLogOut())
    }

    const regiastrationData = {
        login:'fast@rest.test',
        password: '1235',
        commandId:''

    }


    const fetchDataArray = () => {
        fetchData<Operations>('/operations', {
            method:"GET"
        })
            .then((res) => {
                dispatch({type:'error', payload: res})
            console.log(res.data)
        }).catch((e)=> console.log(e))
    }


    const registration = (email: string, password: string, commandId?: string) => {
        const registrationData = {
            email: `${email}`,
            password: `${password}`,
            commadId:`${commandId}`
        }
        fetchData<SignUpBody>('/signup', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData)

        }).then((res) => {
            dispatch({ type: 'error', payload: res })
            console.log(res)
        }).catch((e)=>console.log(e))

    }

    const loginWithData = (email:string, password:string) => {
        const data = {
            email,
            password
        }
        fetchData<AuthResult>('/signin', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => {
            dispatch({ type: "data", payload: res })
            document.cookie =`loginAuth=${res.token}`
            dispatch(authLogIn(res.token))
        }).catch((e)=>console.log(e))
    }

    useEffect(() => {
        if (getCookie('loginAuth') != '' || null ) {
            dispatch(authLogIn(getCookie('loginAuth')))
        }
    },[])

    return (
        <header className={cl.header}>
            <div className={cl.headerContainer}>
                <button onClick={() => fetchDataArray()}>getData</button>
                {/* <button onClick={() => registration(regiastrationData.login, regiastrationData.password, regiastrationData.commandId)}>registration</button> */}
                {/* <button onClick={()=>console.log(getCookie('loginAuth'))}>get cookies</button> */}
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
                        // loginWithData(values.userName, values.password)
                        loginWithData(regiastrationData.login, regiastrationData.password)
                        setLoginPopupState(!loginPopupState)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={cl.form}>
                            <span>login: {regiastrationData.login }</span>
                            <span>password: {regiastrationData.password}</span>
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