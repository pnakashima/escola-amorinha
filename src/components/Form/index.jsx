import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import InputCheckbox from '../InputCheckbox';
import Box from '@material-ui/core/Box'



class Form extends React.Component {

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
            errorMessage: "",
        }

    }

    componentDidMount = () => {
        const { student } = this.props
        this.setState({ ...student })
    }

    checkName = (name) => {
        const letters = /^[A-Za-z]+$/
        return name.match(letters) ? true : false;
    }

    onSubmit = (event, student) => {
        const { onClick } = this.props
        event.preventDefault()

        student = this.state

        const validName = this.checkName(student.nome)

        if (validName) {
            this.setState({ errorMessage: "" })
            onClick(student)  // passando o student pra página pai
        } else {
            this.setState({ errorMessage: "Digite apenas letras" })
        }

        console.log("check validity: ", event.target.checkValidity())

    }

    onInvalid = (event) => {
        event.target.setCustomValidity("Por favor digite um nome")
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

        const { buttonText } = this.props

        return (
            <>
                <form onSubmit={this.onSubmit} style={{margin: 20}}>
                    <Box display="flex" gridGap={20} width="50%">
                        <TextField
                            fullWidth
                            required
                            margin="normal"
                            id="nome"
                            //type="text"
                            label="Nome do Aluno"
                            value={this.state.nome}
                            onChange={this.handleChange}
                            onInvalid={this.onInvalid}
                            placeholder="Digite o nome do aluno"
                            helperText="Digite apenas letras"
                            error={!!this.state.errorMessage}
                        />
                        <TextField
                            fullWidth
                            required
                            margin="normal"
                            id="nascimento"
                            type="date"
                            label="Data de nascimento: "
                            value={this.state.nascimento}
                            onChange={this.handleChange}
                            InputLabelProps={{ shrink: true, }}
                        />
                        <br />
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        <TextField
                            fullWidth
                            margin="normal"
                            id="nomeresponsavel"
                            //type="text"
                            label="Nome do responsável: "
                            value={this.state.nomeresponsavel}
                            onChange={this.handleChange}
                            placeholder="Digite o nome do responsável"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="telresponsavel"
                            type="text"
                            label="Telefone do responsável: "
                            value={this.state.telresponsavel}
                            onChange={this.handleChange}
                            placeholder="(xx)xxxxx-xxxx"
                        />
                        <br />
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        <TextField
                            fullWidth
                            required
                            margin="normal"
                            id="nomeemergencia"
                            type="text"
                            label="Nome do contato de emergência: "
                            value={this.state.nomeemergencia}
                            onChange={this.handleChange}
                            placeholder="Digite o nome do contato de emergência"
                        />
                        <TextField
                            fullWidth
                            required
                            margin="normal"
                            id="telemergencia"
                            type="text"
                            label="Telefone de emergência: "
                            value={this.state.telemergencia}
                            onChange={this.handleChange}
                            placeholder="(xx)xxxxx-xxxx"
                        />
                        <br />
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        <InputCheckbox
                            margin="normal"
                            id="restricaoalim"
                            type="checkbox"
                            label="Possui restrição alimentar?"
                            onChange={this.handleChange}
                            checked={this.state.restricaoalim}
                        />
                        <br />
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        {this.state.restricaoalim &&
                            <TextField
                                fullWidth
                                margin="normal"
                                id="descricaorestricao"
                                type="text"
                                label="Descrição das restrições alimentares"
                                value={this.state.descricaorestricao}
                                placeholder="Descreva as restrições alimentares"
                                onChange={this.handleChange}
                            />}
                        <br />
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        <InputCheckbox
                            margin="normal"
                            id="autorizacaofotos"
                            type="checkbox"
                            label="Autorização de fotos e vídeos da criança"
                            onChange={this.handleChange}
                            checked={this.state.autorizacaofotos}
                        />
                        <br />
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        <TextField
                            fullWidth
                            margin="normal"
                            id="listaautorizados"
                            label="Lista de autorizados a buscar a criança "
                            value={this.state.listaautorizados}
                            onChange={this.handleChange}
                            placeholder="Digite o nome e o parentesco das pessoas autorizadas"
                        />
                        {/* <label>Lista de autorizados a buscar a criança</label>
                        <select>
                            <option value="mae">Mãe</option>
                            <option value="pai">Pai</option>
                            <option value="tio">Tio</option>
                            <option value="avo">Avó</option>
                            <option value="padrinho">Padrinho</option>
                        </select>
                        <br /> */}
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        <TextField
                            fullWidth
                            required
                            margin="normal"
                            id="turma"
                            type="text"
                            label="Turma: "
                            value={this.state.turma}
                            onChange={this.handleChange}
                            placeholder="Número da turma"
                        />
                        <br />
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        <TextField
                            fullWidth
                            margin="normal"
                            id="obsadicionais"
                            label="Observações adicionais "
                            value={this.state.obsadicionais}
                            onChange={this.handleChange}
                            placeholder="Escreva aqui qualquer observação adicional"
                        />
                        <br />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        id="submit"
                    >{buttonText}</Button>
                </form>

            </>
        );
    }
}

export default Form

