import { Component } from "react";
import React from "react";
import { bindActionCreators } from "redux";
import { deleteFromCart, updateItemUnits } from "../actions/cartActions";
import {
  Paper,
  Grid,
  ButtonBase,
  ButtonGroup,
  Typography,
  Button,
  withStyles,
  Divider
} from "@material-ui/core";
import { connect } from "react-redux";
import { Remove, Add } from "@material-ui/icons";
import compose from "recompose/compose";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: theme.spacing(100),
    height: theme.spacing(22)
  },
  cartTotalPaper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: theme.spacing(100)
  },
  image: {
    width: 150,
    height: 150
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  deleteBTN: {
    padding: theme.spacing(2)
  }
});

class Cart extends Component {
  handleDeleteFromCart(productId) {
    this.props.deleteFromCart({ productId });
  }
  handleDeUnit(productId) {
    let units = -1;
    this.props.updateItemUnits({ productId, units });
  }
  handleAddUnit(productId) {
    let units = 1;
    this.props.updateItemUnits({ productId, units });
  }

  cartList() {
    const { classes } = this.props;
    return this.props.cart.map(cartItem => {
      return (
        <div className={classes.root}>
          <Paper
            className={classes.paper}
            elevation={3}
            key={cartItem.productId}
          >
            <Grid container spacing={6}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} src={cartItem.image}></img>
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="subtitle1">
                      {cartItem.brand}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography gutterBottom variant="subtitle1">
                      {cartItem.name}
                    </Typography>
                    <Typography>
                      <b>Price: {cartItem.price} kr</b>
                    </Typography>
                    <Typography>
                      <b>Quantity: {cartItem.units}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} container alignItems="flex-end">
                    <ButtonGroup>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={this.handleDeUnit.bind(
                          this,
                          cartItem.productId
                        )}
                      >
                        <Remove fontSize="small"></Remove>
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        onClick={this.handleAddUnit.bind(
                          this,
                          cartItem.productId
                        )}
                      >
                        <Add fontSize="small"></Add>
                      </Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    container
                    alignItems="flex-end"
                    justify="flex-end"
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={this.handleDeleteFromCart.bind(
                        this,
                        cartItem.productId
                      )}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Divider style={{ maxWidth: 700, margin: "auto" }}></Divider>
        </div>
      );
    });
  }
  cartTotal() {
    const { classes } = this.props;
    return (
      <Paper className={classes.cartTotalPaper} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="row" spacing={2} />
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <b> Total: {this.totalAmount(this.props.cart)} kr</b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  totalAmount(cartArray) {
    return cartArray.reduce((sum, cart) => {
      sum += cart.price * cart.units;
      return sum;
    }, 0);
  }

  render() {
    if (this.props.cart.length !== 0) {
      return (
        <div>
          <Typography variant="h5" align="center">
            <b>Shopping Basket</b>
          </Typography>
          <Typography className="cart">{this.cartList()}</Typography>
          <Typography>{this.cartTotal()}</Typography>
        </div>
      );
    }

    return (
      <div>
        <Typography variant="h5" align="center">
          <b>Your Shopping Basket is empty.</b>
        </Typography>
        <Typography>{this.cartTotal()}</Typography>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};
const mapActionsToProps = dispatch => {
  return bindActionCreators(
    {
      deleteFromCart,
      updateItemUnits
    },
    dispatch
  );
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapActionsToProps)
)(Cart);
