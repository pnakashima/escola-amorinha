import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const ListPage = () => {

    const [studentsList, setStudentsList] = useState(null)    // lista de alunos completa
    const [stateList, setStateList] = useState([])          // lista de alunos usada para display na tela (search)


    // PEGANDO OS DADOS DO MOCK API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/students")
                const json = await response.json()
                const list = json.results
                setStudentsList(list)
            } catch (error) {
                console.error(error)
            } finally {
                console.log("finally")
            }
        }
        fetchData()
    }, [])


    // Atualiza a stateList sempre q o studentsList muda
    useEffect(() => {
        if (studentsList) {
            setStateList(studentsList)
        }
    }, [studentsList])

    const onSearch = (event) => {
        const { value } = event.target
        const list = studentsList.filter(student => student.nome.toLowerCase().includes(value.toLowerCase()))
        setStateList(list)
    }

    const removerAluno = (event) => {
        let lista = studentsList
        let id = (event.target.parentNode.id || event.target.id)
        let filtro = lista.filter((el) => el.id !== id)
        setStudentsList(filtro)
        setStateList(filtro)
        localStorage.setItem("listaDeAlunos", JSON.stringify(filtro))
    }

    // para editar o aluno, retira ele da lista e qdo salvar adiciona de novo
    // VERIFICAR: NAO ESTA RETIRANDO
    const editAluno = (event) => {
        let lista = studentsList
        let id = (event.target.parentNode.id || event.target.id)

        // salvando a lista sem o aluno
        let filtro = lista.filter((el) => el.id !== id)
        setStudentsList(filtro)
        setStateList(filtro)
        localStorage.setItem("listaDeAlunos", JSON.stringify(filtro))
    }

    return (
        <>
            <Header title="Lista de Alunos Matriculados" addPath="/register" />
            <SearchBar type="text" name="search" placeholder="Buscar estudante" onChange={onSearch} />
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
                        {/* {this.state.stateList.map((item, index) => {
                                        return (
                                            <ListItem key={index} {...item} onEdit={this.editAluno} onDelete={this.removerAluno} />
                                        )
                                    })} */}
                        {stateList.map((item, index) => {
                            return (
                                <TableRow key={index} id={item.id}>
                                    <TableCell component="th" scope="row">{item.nome}</TableCell>
                                    <TableCell align="right">{item.nascimento}</TableCell>
                                    <TableCell align="right">{item.turma}</TableCell>
                                    <TableCell align="right">{item.telemergencia}</TableCell>
                                    <TableCell align="right">{item.nomeemergencia}</TableCell>
                                    <TableCell align="right">{item.id}</TableCell>
                                    <TableCell align="right">
                                        <Link
                                            key={index}
                                            to={{ pathname: "/edit", state: { ...item } }}
                                        >
                                            <EditIcon id={item.id} onClick={editAluno} />
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right"><DeleteIcon id={item.id} onClick={removerAluno} /></TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default ListPage



