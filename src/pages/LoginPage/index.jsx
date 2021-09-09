import React, { useState, useContext, useEffect } from 'react'
import Header from '../../components/Header'
import { Box, TextField, Button } from '@material-ui/core'
import { APIContext } from '../../providers/api'
import { useHistory } from 'react-router-dom'
import logo from './school.png'
import PropTypes from 'prop-types'


const LoginPage = ({ setToken }) => {

    const [login, setLogin] = useState("")
    const [senha, setSenha] = useState("")
    const [employees, setEmployees] = useState([])
    const [errorLogin, setErrorLogin] = useState("")
    const [errorSenha, setErrorSenha] = useState("")

    let history = useHistory()

    const { api } = useContext(APIContext)

    // PEGANDO OS DADOS DO MOCK API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const employees = await api.get("/api/employees")
                console.log("fetch", employees)
                const list = employees.results
                console.log("fetch", list)
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
        setToken(false)
        const isEmployee = employees.filter((e) => e.login === login)
        console.log("submit", isEmployee)
        if (isEmployee.length > 0) {
            setErrorLogin("")
            setErrorSenha("")
            if (isEmployee[0].senha === senha) {
                console.log("Login ok")
                setToken(true)
                history.push('/list')
                return true
            } else {
                console.log("Senha incorreta")
                setErrorSenha("Senha incorreta")
                setToken(false)
                return false
            }
        } else {
            console.log("Usuário não encontrado")
            setErrorLogin("Usuário não encontrado")
            setToken(false)
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
            <Header title="Login" />
            <div><img src={logo} alt="logo" width='100' /></div>
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
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    id="submit"
                >Entrar</Button>
            </form>
        </>
    )
}

LoginPage.protoTypes = {
    setToken: PropTypes.func.isRequired
}

export default LoginPage