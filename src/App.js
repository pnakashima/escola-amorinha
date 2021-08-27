import './App.css'
import Header from './components/Header'
import FormPage from './pages/FormPage'
import ListPage from './pages/ListPage'
import React from 'react';
import HomePage from './pages/HomePage';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showForm: false,
      showList: false,

    }

  }

  clickShowForm() {
    this.setState({
      showForm: true,
      showList: false,
    })
  }

  clickShowList() {
    this.setState({
      showForm: false,
      showList: true,
    })
  }

  render() {

    const showForm = this.state.showForm
    const showList = this.state.showList 

    return (
      <div className="App">
        <Header title="App Secretaria" />
        <a onClick={this.clickShowForm.bind(this)}>Cadastro de Aluno</a>
        <br />
        <a onClick={this.clickShowList.bind(this)}>Lista de Alunos</a>
        {showForm && <FormPage cadastro={true} />}
        {showList && <ListPage />}

        {/* <HomePage /> */}
      </div>
    )

  }
}

export default App;
