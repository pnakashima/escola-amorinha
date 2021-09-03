import React from "react";
import PropTypes from "prop-types";
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
//import { Link } from "react-router-dom";


const ListItem = ({ index, id, nome, nascimento, turma, telemergencia, nomeemergencia, onEdit, onDelete, }) => {
  return (
    <>
      <TableRow key={index} id={id}>
        <TableCell component="th" scope="row">{nome}</TableCell>
        <TableCell align="right">{nascimento}</TableCell>
        <TableCell align="right">{turma}</TableCell>
        <TableCell align="right">{telemergencia}</TableCell>
        <TableCell align="right">{nomeemergencia}</TableCell>
        <TableCell align="right">{id}</TableCell>
        <TableCell align="right">
          {/* <Link
              key={index}
              to={{ pathname: "/edit", state: { } }}> */}
          <EditIcon id={id} localName={id} onClick={onEdit} />
          {/* </Link> */}
        </TableCell>
        <TableCell align="right"><DeleteIcon id={id} localName={id} onClick={onDelete} /></TableCell>
      </TableRow>
    </>
  )
}

ListItem.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.string,
};

export default ListItem;

