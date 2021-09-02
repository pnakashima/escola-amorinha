import React from 'react'

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { Link } from 'react-router-dom';

class Header extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        actionText: PropTypes.string,
        addPath: PropTypes.string,
        backPath: PropTypes.string,
    };

    render() {
        const { addPath, title, backPath } = this.props
        return (
            <AppBar position="static">
                <Toolbar>
                    {backPath && (
                        <Link to={backPath}>
                            <KeyboardArrowLeft />
                        </Link>

                    )}
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    {addPath && (
                        <Link to={addPath}>
                            <AddIcon />
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header