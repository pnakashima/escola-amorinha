import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";


class ListItem extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
  };



  render() {
    const { id, nome, nascimento, turma, telemergencia, nomeemergencia, onEdit, onDelete } = this.props

    return (
      <li>
         {nome} -
         {nascimento} - 
         {turma} - 
         {telemergencia} -
         {nomeemergencia} -
         {id} -
        <Button id={id} name={nome} onClick={onEdit}>Editar</Button>
        <Button id={id} name={nome} onClick={onDelete}>Excluir</Button>
      </li>
    )
  }
}

export default ListItem;

