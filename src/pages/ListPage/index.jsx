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
            currentList: [],           
        }

        this.originalList = []              
        this.isEditing = false
        this.student = {}
    }



    getList = (list) => {
        let lista = localStorage.getItem(list)
        if (!lista) {
            lista = []
        } else {
            lista = JSON.parse(lista)
        }
        console.log("lista: ", lista)
        return lista
    }


    // componentDidMount() {
    //     console.log("didmount")
    //     fetch("https://randomuser.me/api/?results=5")
    //         .then((response) => response.json())
    //         .then((data) =>
    //             data.results.map(result => {
    //                 return {
    //                     id: result.cell,
    //                     nome: `${result.name.first} ${result.name.last} `,
    //                     nomeemergencia: result.location.city,
    //                     telemergencia: result.phone,
    //                     nascimento: result.dob.date,
    //                     turma: result.location.street.number,
    //                 }
    //             })
    //         )
    //         .then(result => {
    //             this.studentsList = result
    //             this.forceUpdate()
    //         })
    //         .catch(console.error)
    //         .finally(() => console.log("finally"))
    // }

    // MELHORANDO USANDO DESCONSTRUCAO:
    // componentDidMount() {
    //     console.log("didmount")
    //     fetch("https://randomuser.me/api/?results=5")
    //         .then((response) => response.json())
    //         .then(({ results }) =>
    //             results.map(({ cell, name, location, phone, dob }) => {
    //                 return {
    //                     id: cell,
    //                     nome: `${name.first} ${name.last} `,
    //                     nomeemergencia: location.city,
    //                     telemergencia: phone,
    //                     nascimento: dob.date,
    //                     turma: location.street.number,
    //                 }
    //             })
    //         )
    //         .then(result => {
    //             this.studentsList = result
    //             this.forceUpdate()
    //         })
    //         .catch(console.error)
    //         .finally(() => console.log("finally"))
    // }

    // TRANSFORMANDO PROMISES EM ASYNC/AWAIT
    // async componentDidMount() {
    //     console.log("didmount")

    //     try {
    //         const response = await fetch("https://randomuser.me/api/?results=5")
    //         const json = await response.json()
    //         const list = json.results.map(({ cell, name, location, phone, dob }) => {
    //             return {
    //                 id: cell,
    //                 nome: `${name.first} ${name.last} `,
    //                 nomeemergencia: location.city,
    //                 telemergencia: phone,
    //                 nascimento: dob.date,
    //                 turma: location.street.number,
    //             }
    //         })
    //         this.studentsList = list
    //         this.forceUpdate()
    //     } catch (error) {
    //         console.error(error)
    //     } finally {
    //         console.log("finally")
    //     }
    // }

    // PEGANDO OS DADOS DO MOCK API
    async componentDidMount() {
        console.log("didmount")

        try {
            const response = await fetch("/api/students")
            const json = await response.json()
            const list = json.results.map(({ cell, name, location, phone, dob }) => {
                return {
                    id: cell,
                    nome: `${name.first} ${name.last} `,
                    nomeemergencia: location.city,
                    telemergencia: phone,
                    nascimento: dob.date.slice(0, 10),
                    turma: location.street.number,
                }
            })
            this.originalList = list                
            this.setState({
                currentList: list,
            })
        } catch (error) {
            console.error(error)
        } finally {
            console.log("finally")
        }
    }


    onSearch = (event) => {
        const { value } = event.target
        this.setState({
            currentList: this.originalList.filter(student => {
                return student.nome.toLowerCase().includes(value.toLowerCase())
            })
        })
    }


    removerAluno = (event) => {
        let lista = this.originalList
        let id = (event.target.parentNode.id || event.target.id)
        let filtro = lista.filter((el) => el.id !== id)
        this.originalList = filtro
        this.setState({ currentList: filtro })
    }


    // Para editar: pego o aluno, removo da lista e armazeno no localStorage.
    // Caso o usuário salve as alterações, coloco o aluno novo na lista.
    // CAso o usuário descarte as alterações, pego no localStorage e coloco na lista.
    editAluno = (event) => {
        this.isEditing = true
        let lista = this.originalList
        let id = (event.target.parentNode.id || event.target.id)
        
        // filtrando o aluno e armazenando no localStorage e no state
        let filtro = lista.filter((el) => el.id === id)
        localStorage.setItem("editarAluno", JSON.stringify(filtro))
        this.setState({ ...filtro[0] })

        // salvando a lista sem o aluno
        filtro = lista.filter((el) => el.id !== id)
        this.originalList = filtro
    }

    salvarAluno = (event) => {
        event.preventDefault()
        let lista = this.originalList
        lista.push(this.state)
        this.isEditing = false
        this.originalList = lista
        this.setState({currentList: lista})
    }

    voltar = () => {
        let lista = this.originalList
        let aluno = localStorage.getItem("editarAluno")
        aluno = JSON.parse(aluno)
        lista.push(aluno[0])
        this.isEditing = false
        this.originalList = lista
        this.setState({currentList: lista})
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
                                    {this.state.currentList.map((item, index) => {
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



