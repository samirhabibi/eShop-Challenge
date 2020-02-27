import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {
  Toolbar,
  AppBar,
  IconButton,
  Badge,
  withStyles,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import compose from "recompose/compose";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },

  title: {
    flexGrow: 1
  },
  img: {
    height: 50,
    display: "block"
  }
});

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ background: "#3b3d47" }}>
          <Toolbar>
            <div className={classes.title}>
              <IconButton>
                <Link to="/">
                  <img
                    className={classes.img}
                    src={require("./images/logo(1).svg")}
                  ></img>
                </Link>
              </IconButton>
            </div>
            <Button>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Shop
              </Link>
            </Button>
            <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
              <Badge badgeContent={this.props.cart.length} color="secondary">
                <ShoppingCartOutlined></ShoppingCartOutlined>
              </Badge>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default compose(withStyles(useStyles), connect(mapStateToProps))(Navbar);
