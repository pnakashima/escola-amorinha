import React from 'react'
import ListItem from '../../components/ListItem'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditPage from '../EditPage';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


class ListPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            stateList: [],
        }

        this.studentsList = []
        this.isEditing = false
        this.student = {}
    }


    // PEGANDO OS DADOS DO MOCK API
    async componentDidMount() {
        console.log("didmount listpage")

        try {
            const response = await fetch("/api/students")
            const json = await response.json()
            // const list = json.results.map(({ cell, name, location, phone, dob }) => {
            //     return {
            //         id: cell,
            //         nome: `${name.first} ${name.last} `,
            //         nomeemergencia: location.city,
            //         telemergencia: phone,
            //         nascimento: dob.date.slice(0, 10),
            //         turma: location.street.number,
            //     }
            // })
            const list = json.results
            this.studentsList = list
            this.setState({
                stateList: list,
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
            stateList: this.studentsList.filter(student => {
                return student.nome.toLowerCase().includes(value.toLowerCase())
            })
        })
    }


    removerAluno = (event) => {
        let lista = this.studentsList
        let id = (event.target.parentNode.id || event.target.id)
        let filtro = lista.filter((el) => el.id !== id)
        this.studentsList = filtro
        this.setState({ stateList: filtro })
        localStorage.setItem("listaDeAlunos", JSON.stringify(filtro))
    }


    // Para editar: pego o aluno, removo da lista e armazeno no student.
    // Caso o usuário salve as alterações, coloco o aluno novo na lista.
    // CAso o usuário descarte as alterações, recoloco o student na lista.
    editAluno = (event) => {
        this.isEditing = true
        let lista = this.studentsList
        let id = (event.target.parentNode.id || event.target.id)

        // filtrando o aluno e armazenando no localStorage e no student
        let filtro = lista.filter((el) => el.id === id)
        this.student = filtro[0]
        localStorage.setItem("alunoSelecionado", JSON.stringify(filtro))

        // salvando a lista sem o aluno
        filtro = lista.filter((el) => el.id !== id)
        this.studentsList = filtro
        this.setState({ stateList: filtro })
        localStorage.setItem("listaDeAlunos", JSON.stringify(filtro))
    }

    // student vem do onClick do form
    salvarAluno = async (student) => {
        let lista = this.studentsList
        lista.push(student)
        this.isEditing = false
        this.setState({ stateList: lista })
        await fetch("/api/add", {
            method: 'POST',
            body: JSON.stringify(student)
        })
    }

    voltar = () => {
        let lista = this.studentsList
        let aluno = this.student 
        lista.push(aluno)
        this.isEditing = false
        this.studentsList = lista
        this.setState({ stateList: lista })
        localStorage.setItem("listaDeAlunos", JSON.stringify(lista))
    }


    render() {
        return (
            <>

                {!this.isEditing &&
                    <>
                        <Header title="Lista de Alunos Matriculados" addPath="/register"/>
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
                                    {this.state.stateList.map((item, index) => {
                                        return (
                                            <ListItem key={index} {...item} onEdit={this.editAluno} onDelete={this.removerAluno} />
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>}

                {this.isEditing &&
                    <>
                        <EditPage student={this.student}  />
                    </>
                }
            </>
        )
    }
}





export default withStyles(useStyles, { withTheme: true })(ListPage)



