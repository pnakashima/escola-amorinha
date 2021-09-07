import React, { useState, useContext, useEffect } from 'react'
import Header from '../../components/Header'
import { Box, TextField, Button } from '@material-ui/core'
import { APIContext } from '../../providers/api';
import { Redirect } from 'react-router-dom';
import ListPage from '../ListPage';


const LoginPage = () => {

    const [login, setLogin] = useState("")
    const [senha, setSenha] = useState("")
    const [employees, setEmployees] = useState([])
    const [errorLogin, setErrorLogin] = useState("")
    const [errorSenha, setErrorSenha] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)


    const { api } = useContext(APIContext)

    // PEGANDO OS DADOS DO MOCK API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const employees = await api.get("/api/employees")
                const list = employees.results
                setEmployees(list)
            } catch (error) {
                console.error(error)
            } finally {
                console.log("finally")
            }
        }
        fetchData()
    }, [api])



    const onSubmit = (event) => {
        event.preventDefault()
        const isEmployee = employees.filter((e) => e.login === login)
        if (isEmployee.length > 0) {
            setErrorLogin("")
            setErrorSenha("")
            if (isEmployee[0].senha === senha) {
                console.log("Login ok")
                setLoggedIn(true)
                return true
            } else {
                console.log("Senha incorreta")
                setErrorSenha("Senha incorreta")
                return false
            }
        } else {
            console.log("Usuário não encontrado")
            setErrorLogin("Usuário não encontrado")
            return false
        }
    }

    // const onSubmit = (event) => {
    //     event.preventDefault()
    //     validateLogin()
    // }

    // const onInvalid = (event) => {
    //     event.target.setCustomValidity("Por favor digite um nome")
    // }

    return (
        <>
            {loggedIn && <Redirect to="/list" />}
            {!loggedIn &&
                <>
                    <Header title="Login" />
                    <form onSubmit={onSubmit}>
                        <Box display="flex" gridGap={20} width="50%">
                            <TextField
                                fullWidth
                                required
                                margin="normal"
                                id="login"
                                label="Login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                //onInvalid={onInvalid}
                                placeholder="Login"
                                helperText={errorLogin}
                                error={!!errorLogin}
                            />
                        </Box>
                        <Box display="flex" gridGap={20} width="50%">
                            <TextField
                                fullWidth
                                required
                                margin="normal"
                                id="senha"
                                label="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                //onInvalid={onInvalid}
                                placeholder="Senha"
                                helperText={errorSenha}
                                error={!!errorSenha}
                            />
                        </Box>
                        {/* <Link to={loginPath}> */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            id="submit"
                        >Entrar</Button>
                        {/* </Link> */}
                    </form>
                </>
            }
        </>
    )
}

export default LoginPage