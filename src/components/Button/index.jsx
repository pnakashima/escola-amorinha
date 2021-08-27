import React from 'react'
import PropTypes from "prop-types";

// children aqui vai ser o texto que vai no botao
const Button = ({ id, name, children, onClick }) => {
  return <button id={id} name={name} onClick={onClick}> {children} </button>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;