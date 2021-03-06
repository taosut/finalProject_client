/**
 * Cart Component.
 * It responses on rendering cart view.
 * @module Cart
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { connect } from 'react-redux';
import CartItem from './CartItem/CartItem';
import { updateProductInCart } from '../../actions/cart';
import { URL_PRODUCT_IMAGES } from '../../config/app';

import './Cart.scss';

const propTypes = {
  /** Array of products. */
  products: PropTypes.arrayOf(
    PropTypes.shape({
      /** Preview picture src. */
      picture: PropTypes.string.isRequired,
      /** Product name. */
      name: PropTypes.string.isRequired,
      /** In cart quantity. */
      quantity: PropTypes.number.isRequired,
      /** Product price. */
      price: PropTypes.number.isRequired,
    })
  ),
  /** Base dir for the images. */
  imagesDir: PropTypes.string.isRequired,
  /** Handler to change quantity. */
  callUpdateProductInCart: PropTypes.func.isRequired,
  /** Total cart price. */
  total: PropTypes.number.isRequired,
};
const defaultProps = {
  products: []
};

const Cart = ({ total, products, imagesDir, callUpdateProductInCart }) => {
  if (products.length === 0){
    return (
      <section className="cart">
        <div className="container">
          <div className="cart__content">
            <h1 className="cart__title">Cart</h1>
            <p className="cart__message">Your cart is empty :(</p>
            <FiShoppingCart className="cart__emptyImg" />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="cart">
      <div className="container">
        <div className="cart__content">
          <h1 className="cart__title">Cart</h1>
          <div className="cartTableHeader">
            <div className="cartTableHeader__close" />
            <div className="cartTableHeader__product">Product</div>
            <div className="cartTableHeader__quantity">Quantity</div>
            <div className="cartTableHeader__price">Price</div>
          </div>
          <div className="cart__line" />

          {products.map(({
            slug, price, quantity, picture, name
          }) => (
            <CartItem
              key={slug}
              price={price}
              quantity={quantity}
              name={name}
              picture={`${URL_PRODUCT_IMAGES}/sm-${picture}`}
              onChangeQuantity={q => callUpdateProductInCart(slug, q)}
            />
          ))}
          <div className="cart__total">
            <span className="cart__totalSpace" />
            <span className="cart__totalTitle">Total</span>
            <span className="cart__totalPrice">
              ${ total }
            </span>
          </div>
          <NavLink to="/checkout" className="cart__btnCheckout">
            Proceed to checkout
          </NavLink>
        </div>
      </div>
    </section>
  );
};

Cart.propTypes = propTypes;
Cart.defaultProps = defaultProps;

const mapStateToProps = state => ({
  total: state.cart.total,
  products: state.cart.products,
  imagesDir: state.products.imagesDir
});

const mapDispatchToProps = dispatch => ({
  callUpdateProductInCart: (slug, quantity) => dispatch(updateProductInCart(slug, quantity))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
