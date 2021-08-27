import React from 'react'
import ListItem from '../../components/ListItem'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import Form from '../../components/Form'
import Button from '../../components/Button'
import { ThreeSixtyTwoTone } from '@material-ui/icons'



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
        let lista = this.getList("listaDeAlunos")
        let id = event.target.id
        //console.log("remover id: ", id)
        let filtro = lista.filter((el) => el.id !== id)
        localStorage.setItem("listaDeAlunos", JSON.stringify(filtro))
        //this.setState({ studentsList: filtro })
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
        let id = event.target.id
        let filtro = lista.filter((el) => el.id === id)
        localStorage.setItem("editarAluno", JSON.stringify(filtro))
        //this.setState({ student: filtro[0] })
        //this.student = filtro[0]
        this.setState({...filtro[0]})

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

    // handleChange = (event) => {
    //     //console.log("list page handleChange event:", event)
    //     const inputName = event.target.id
    //     const inputValue = event.target.value
    //     //console.log("list page handleChange event:", inputName, inputValue)
    //     this.setState({ [inputName]: inputValue })
    // }

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
                {/* {!this.state.isEditing && */}
                {!this.isEditing &&
                    <>
                        <Header title="Diretório de Alunos" />

                        <SearchBar type="text" id="search" placeholder="Buscar aluno" onChange={this.onSearch} />
                        
                        <ul>
                            {/* {this.state.studentsList.map((item, index) => { */}
                            {this.studentsList.map((item, index) => {
                                return (
                                    <ListItem key={index} {...item} onEdit={this.editAluno} onDelete={this.removerAluno} />
                                )
                            })}
                        </ul>
                    </>
                }

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
                        <Button onClick={this.voltar}>Descartar Alterações</Button>
                    </>
                }
            </>
        )
    }
}



// class MyContainer extends Component {
//     state = {
//       name: 'foo'
//     }

//     handleNameChange = name => {
//       this.setState({ name })
//     }

//     render() {
//       return (
//         <MyChild name={this.state.name} onNameChange={this.handleNameChange} />
//       )
//     }

//   }

//   export default MyContainer

//   // myChild.js
//   import React, { Component } from 'react'

//   class MyChild extends Component {

//     handleInputChange = event => {
//       this.props.onNameChange(event.target.value)
//     }

//     render() {
//       return (
//         <div>
//           <input type="text" onChange={this.handleInputChange} value={this.props.name} />
//           <div>The name is: {this.props.name}</div>
//         </div>
//       )
//     }

//   }

//   export default MyChild

export default ListPage



