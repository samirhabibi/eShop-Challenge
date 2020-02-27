import { Component } from "react";
import React from "react";
import { connect } from "react-redux";
import {
  Card,
  Typography,
  CardContent,
  Button,
  CardActions,
  Container,
  Grid,
  withStyles
} from "@material-ui/core";

import { fetchProducts } from "../actions/productAction";
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { addToCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
const useStyles = theme => ({
  root: {
    maxWidth: 400
  },
  img: {
    height: 150,
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

class Home extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  dispachAddToCart(body) {
    this.props.addToCart(body);
  }

  render() {
    const { error, loading, body } = this.props;
    const { classes } = this.props;
    console.log(this.props);

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {body.map(item => (
              <Grid item key={item.productId} xs={12} sm={6} md={4}>
                <Card className={classes.root} elevation={2}>
                  <img className={classes.img} src={item.image}></img>
                  <CardContent>
                    <Typography color="primary">{item.brand}</Typography>
                    <Typography color="textSecondary">{item.name}</Typography>

                    <Typography>
                      <b>Price: {item.price} kr</b>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary">
                      <Link
                        to="/"
                        onClick={this.dispachAddToCart.bind(this, item)}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Add to cart
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  body: state.products.body,
  loading: state.products.loading,
  error: state.products.error
});

const mapActionsToProps = dispatch => {
  return bindActionCreators(
    {
      fetchProducts,
      addToCart
    },
    dispatch
  );
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapActionsToProps)
)(Home);
