import React from 'react'
import TextArea from '../../components/TextArea'
import Input from '../../components/Input'

class Form extends React.Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         id: "",
    //         nome: "",
    //         nascimento: "",
    //         nomeresponsavel: "",
    //         telresponsavel: "",
    //         turma: "",
    //         telemergencia: "",
    //         nomeemergencia: "",
    //         restricaoalim: "",
    //         descricaorestricao: "",
    //         autorizacaofotos: "",
    //         listaautorizados: "",
    //         obsadicionais: "",
    //     }
    //     this.student = {}

    //    // this.cadastro = true
    // }

    // async componentDidMount() {
    //     await this.setState({
    //         ...this.props.student,
    //     })
    // }

    // phoneMask = (event) => {
    //     let text = event.target.value
    //     let numbers = text.replace(/\D/g, '')
    //     let mask = [...numbers].map((letter, i) => {
    //         if (i === 0) return ['(', letter]
    //         if (i === 2) return [')', letter]
    //         if (i === 7) return ['-', letter]
    //         if (i > 10) return ['']
    //         return letter
    //     }).flat(1).join('')

    //     const inputName = event.target.id
    //     const inputValue = mask

    //     this.setState({ [inputName]: inputValue })
    // }

    // numberMask = (event) => {
    //     let text = event.target.value
    //     let numbers = text.replace(/\D/g, '')

    //     const inputName = event.target.id
    //     const inputValue = numbers

    //     this.setState({ [inputName]: inputValue })
    // }

    // handleChange = (event) => {
    //     const inputName = event.target.id
    //     const inputValue = event.target.value

    //     this.setState({ [inputName]: inputValue })
    // }

    // handleCheck = (event) => {
    //     const inputName = event.target.id
    //     const inputValue = event.target.checked

    //     this.setState({ [inputName]: inputValue })
    // }

    render() {

        const {value, student, onChange, onSubmit } = this.props

        return (
            <form>
                <Input
                    id="nome"
                    type="text"
                    label="Nome do Aluno"
                    // value={this.state.nome}
                    value={student.nome}
                    //onChange={this.handleChange}
                    onChange={onChange}
                    //onEdit={this.onEdit}
                    placeholder="Digite o nome do aluno"
                />
                <Input
                    id="nascimento"
                    type="date"
                    label="Data de nascimento: "
                    value={student.nascimento}
                    onChange={onChange}
                />
                <Input
                    id="nomeresponsavel"
                    type="text"
                    label="Nome do responsável: "
                    value={student.nomeresponsavel}
                    onChange={onChange}
                    placeholder="Digite o nome do responsável"
                />
                <Input
                    id="telresponsavel"
                    type="text"
                    label="Telefone do responsável: "
                    value={student.telresponsavel}
                    //onChange={phoneMask}
                    onChange={onChange}
                    placeholder="(xx)xxxxx-xxxx"
                />
                <Input
                    id="nomeemergencia"
                    type="text"
                    label="Nome do contato de emergência: "
                    value={student.nomeemergencia}
                    onChange={onChange}
                    placeholder="Digite o nome do contato de emergência"
                />
                <Input
                    id="telemergencia"
                    type="text"
                    label="Telefone de emergência: "
                    value={student.telemergencia}
                    //onChange={phoneMask}
                    onChange={onChange}
                    placeholder="(xx)xxxxx-xxxx"
                />
                < Input
                    id="restricaoalim"
                    type="checkbox"
                    label="Possui restrição alimentar?"
                    //onChange={handleCheck}
                    onChange={onChange}
                    checked={student.restricaoalim}
                />
                {student.restricaoalim &&
                    <Input
                        id="descricaorestricao"
                        type="text"
                        label="Descrição das restrições alimentares"
                        value={student.descricaorestricao}
                        placeholder="Descreva as restrições alimentares"
                        onChange={onChange}
                    />}
                <Input
                    id="autorizacaofotos"
                    type="checkbox"
                    label="Autorização de fotos e vídeos da criança"
                    //onChange={handleCheck}
                    onChange={onChange}
                    checked={student.autorizacaofotos}
                />
                <TextArea
                    id="listaautorizados"
                    label="Lista de autorizados a buscar a criança "
                    value={student.listaautorizados}
                    onChange={onChange}
                    placeholder="Digite o nome e o parentesco das pessoas autorizadas" />
                <Input
                    id="turma"
                    type="text"
                    label="Turma: "
                    value={student.turma}
                    //onChange={numberMask}
                    onChange={onChange}
                    placeholder="Número da turma" />
                <TextArea
                    id="obsadicionais"
                    label="Observações adicionais "
                    value={student.obsadicionais}
                    onChange={onChange}
                    placeholder="Escreva aqui qualquer observação adicional"
                />
                <Input
                    id="submit"
                    type="submit"
                    value={value}
                    onClick={onSubmit}
                />
            </form>
        );
    }
}

export default Form
