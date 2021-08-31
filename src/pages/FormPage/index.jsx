import React from 'react'
import Header from '../../components/Header'
import Form from '../../components/Form'
import { withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core'


class FormPage extends React.Component {

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
  }

  idGen = () => Math.floor((1 + Math.random()) * 0x1000000).toString(16)  // gera um id aleatorio

  async componentDidMount() {
    await this.setState({
      id: this.idGen(),
    })
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

  adicionarAluno = (event) => {
    event.preventDefault()
    let id = this.idGen()
    this.setState({ id: id })
    let lista = this.getList("listaDeAlunos")
    lista.push(this.state)
    localStorage.setItem("listaDeAlunos", JSON.stringify(lista))
  }

  
  handleChange = (event) => {
    
    let inputName = event.target.id
 
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
      event.target.checked = inputValue
    } else {
      const inputValue = event.target.value
      this.setState({ [inputName]: inputValue })
    }

  }


  render() {
    return (
      <>
        <Header title="Formulário de Cadastro de Aluno" />
        <Form
          value="Cadastrar"
          student={this.state}
          onChange={this.handleChange}
          onSubmit={this.adicionarAluno}
        />
      </>
    );
  }
}

export default FormPage


