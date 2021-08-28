import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import InputCheckbox from '../InputCheckbox';

const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1, 4),
            width: '100ch',
        },
    },
});



class Form extends React.Component {

    render() {

        const { classes, value, student, onChange, onSubmit } = this.props

        return (
            <>
                <form classname={classes.root}>
                    <TextField
                        id="nome"
                        //type="text"
                        label="Nome do Aluno"
                        value={student.nome}
                        onChange={onChange}
                        placeholder="Digite o nome do aluno"
                    />
                    <TextField
                        id="nascimento"
                        type="date"
                        label="Data de nascimento: "
                        value={student.nascimento}
                        onChange={onChange}
                        InputLabelProps={{ shrink: true, }}
                    />
                    <br />
                    <TextField
                        id="nomeresponsavel"
                        //type="text"
                        label="Nome do responsável: "
                        value={student.nomeresponsavel}
                        onChange={onChange}
                        placeholder="Digite o nome do responsável"
                    />
                    <TextField
                        id="telresponsavel"
                        type="text"
                        label="Telefone do responsável: "
                        value={student.telresponsavel}
                        onChange={onChange}
                        placeholder="(xx)xxxxx-xxxx"
                    />
                    <br />
                    <TextField
                        id="nomeemergencia"
                        type="text"
                        label="Nome do contato de emergência: "
                        value={student.nomeemergencia}
                        onChange={onChange}
                        placeholder="Digite o nome do contato de emergência"
                    />
                    <TextField
                        id="telemergencia"
                        type="text"
                        label="Telefone de emergência: "
                        value={student.telemergencia}
                        onChange={onChange}
                        placeholder="(xx)xxxxx-xxxx"
                    />
                    <br />
                    <InputCheckbox
                        id="restricaoalim"
                        type="checkbox"
                        label="Possui restrição alimentar?"
                        onChange={onChange}
                        checked={student.restricaoalim}
                    />
                    {student.restricaoalim &&
                        <TextField
                            id="descricaorestricao"
                            type="text"
                            label="Descrição das restrições alimentares"
                            value={student.descricaorestricao}
                            placeholder="Descreva as restrições alimentares"
                            onChange={onChange}
                        />}
                    <br />
                    <InputCheckbox
                        id="autorizacaofotos"
                        type="checkbox"
                        label="Autorização de fotos e vídeos da criança"
                        onChange={onChange}
                        checked={student.autorizacaofotos}
                    />
                    <br />
                    <TextField
                        id="listaautorizados"
                        label="Lista de autorizados a buscar a criança "
                        value={student.listaautorizados}
                        onChange={onChange}
                        placeholder="Digite o nome e o parentesco das pessoas autorizadas"
                    />
                    <br />
                    <TextField
                        id="turma"
                        type="text"
                        label="Turma: "
                        value={student.turma}
                        onChange={onChange}
                        placeholder="Número da turma"
                    />
                    <br />
                    <TextField
                        id="obsadicionais"
                        label="Observações adicionais "
                        value={student.obsadicionais}
                        onChange={onChange}
                        placeholder="Escreva aqui qualquer observação adicional"
                    />
                    <br />

                </form>
                <Button
                    variant="contained"
                    color="primary"
                    id="submit"
                    value={value}
                    onClick={onSubmit}
                >Salvar</Button>

            </>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(Form)
// export default Form

