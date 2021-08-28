import React from 'react'
import ListItem from '../../components/ListItem'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import Form from '../../components/Form'
//import Button from '../../components/Button'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


function lerLista() {
    let lista = localStorage.getItem("listaDeAlunos")
    if (!lista) {
        lista = []
        localStorage.setItem("listaDeAlunos", JSON.stringify(lista))
        return lista
    } else {
        lista = JSON.parse(lista)
        return lista
    }
}

class ListPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            nome: "",
            nascimento: "",
            nomeresponsavel: "",
            telresponsavel: "",
            turma: "",
            telemergencia: "",
            nomeemergencia: "",
            restricaoalim: "",
            descricaorestricao: "",
            autorizacaofotos: "",
            listaautorizados: "",
            obsadicionais: "",
        }

        // PROBLEMA: NAO ESTA EDITANDO, ACHEI Q O PROBLEMA ERA O STATE, POR ISSO DEIXEI O STATE IGUAL O FORM E ENCHI O CODIGO DE FORCE UPDATE
        // TENTAR ARRUMAR ISSO
        // this.state = {
        //     studentsList: [],
        //     isEditing: false,
        //     student: {},
        // }

        this.list = lerLista()
        this.isEditing = false
        this.student = {}
        this.studentsList = []

    }



    getList = (list) => {
        let lista = localStorage.getItem(list)
        if (!lista) {
            lista = []
        } else {
            lista = JSON.parse(lista)
        }
        return lista
    }

    onSearch = (event) => {
        //console.log(event)
        const { value } = event.target
        // this.setState({
        //     studentsList: this.list.filter(student => {
        //         return student.nome.toLowerCase().includes(value.toLowerCase())
        //     })
        // })
        this.studentsList = this.list.filter(student => student.nome.toLowerCase().includes(value.toLowerCase()))
        this.forceUpdate()
    }

    async componentWillMount() {
        // await this.setState({
        //     studentsList: this.list,
        // })
        this.studentsList = this.getList("listaDeAlunos")
    }

    removerAluno = (event) => {
        //console.log(event)
        //console.log(event.target)
        let lista = this.getList("listaDeAlunos")
        let id = (event.target.parentNode.id || event.target.id)
        //console.log("remover id: ", id)
        let filtro = lista.filter((el) => el.id !== id)
        localStorage.setItem("listaDeAlunos", JSON.stringify(filtro))
        this.setState({ studentsList: filtro })
        this.studentsList = filtro
        //console.log(this.studentsList)
        this.forceUpdate()
    }

    //EDIÇÃO DE ALUNO: pega o aluno da lista e guarda no state.student, e apaga o aluno da lista do local storage
    //                 se salvar, coloca um novo aluno com as informacoes atualizadas na lista do local storage
    //                 se voltar, coloca o state.student na lista do local storage

    editAluno = (event) => {
        //this.setState({ isEditing: true })
        this.isEditing = true
        let lista = this.getList("listaDeAlunos")
        let id = (event.target.parentNode.id || event.target.id)
        let filtro = lista.filter((el) => el.id === id)
        localStorage.setItem("editarAluno", JSON.stringify(filtro))
        //this.setState({ student: filtro[0] })
        //this.student = filtro[0]
        this.setState({ ...filtro[0] })

        //apagando o aluno do local storage
        filtro = lista.filter((el) => el.id !== id)
        localStorage.setItem("listaDeAlunos", JSON.stringify(filtro))
        //this.setState({ studentsList: filtro })
        this.studentsList = filtro

        this.forceUpdate()
    }

    salvarAluno = (event) => {
        event.preventDefault()
        let lista = this.getList("listaDeAlunos")
        //console.log("salvar aluno state: ", this.state)
        lista.push(this.state)
        localStorage.setItem("listaDeAlunos", JSON.stringify(lista))
        //this.setState({ isEditing: false })
        this.isEditing = false
        this.studentsList = lista
        this.forceUpdate()
    }

    voltar = () => {
        let lista = this.getList("listaDeAlunos")
        //lista.push(this.state.student)
        lista.push(this.state)
        localStorage.setItem("listaDeAlunos", JSON.stringify(lista))
        this.studentsList = lista
        //this.setState({ isEditing: false })
        this.isEditing = false
        this.forceUpdate()
    }


    handleChange = (event) => {

        const inputName = event.target.id

        //numberMask
        if (inputName === "turma") {
            let text = event.target.value
            let numbers = text.replace(/\D/g, '')
            const inputValue = numbers
            event.target.value = numbers
            this.setState({ [inputName]: inputValue })
        }

        //phoneMask
        if ((inputName === "telemergencia") || (inputName === "telresponsavel")) {
            let text = event.target.value
            let numbers = text.replace(/\D/g, '')
            let mask = [...numbers].map((letter, i) => {
                if (i === 0) return ['(', letter]
                if (i === 2) return [')', letter]
                if (i === 7) return ['-', letter]
                if (i > 10) return ['']
                return letter
            }).flat(1).join('')
            const inputValue = mask
            event.target.value = mask
            this.setState({ [inputName]: inputValue })
        }

        //handleCheck
        if (event.target.type === "checkbox") {
            const inputValue = event.target.checked
            if (inputValue === true) {
                this.setState({ [inputName]: "checked" })
            } else {
                this.setState({ [inputName]: "" })
            }
        } else {
            const inputValue = event.target.value
            this.setState({ [inputName]: inputValue })
        }

    }



    render() {
        return (
            <>

                {!this.isEditing &&
                    <>        
                    <Header title="Lista de Alunos Matriculados" />
                        <SearchBar type="text" name="search" placeholder="Buscar estudante" onChange={this.onSearch} />
                        <br />
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell align="right">Data de Nascimento</TableCell>
                                        <TableCell align="right">Turma</TableCell>
                                        <TableCell align="right">Telefone para Emergências</TableCell>
                                        <TableCell align="right">Contato de Emergência</TableCell>
                                        <TableCell align="right">ID</TableCell>
                                        <TableCell align="right">Editar</TableCell>
                                        <TableCell align="right">Excluir</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.studentsList.map((item, index) => {
                                        return (
                                            <ListItem key={index} {...item} onEdit={this.editAluno} onDelete={this.removerAluno} />
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>}

                {/* {this.state.isEditing && */}
                {this.isEditing &&
                    <>
                        <Header title="Edição de Informações" />
                        <Form
                            value="Salvar Alterações"
                            //student={this.state.student}
                            student={this.state}
                            onChange={this.handleChange}
                            onSubmit={this.salvarAluno}
                        />
                        <Button variant="contained" color="primary" onClick={this.voltar}>Descartar Alterações</Button>
                    </>
                }
            </>
        )
    }
}





export default withStyles(useStyles, { withTheme: true })(ListPage)



