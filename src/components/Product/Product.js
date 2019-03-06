import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FiShoppingBag } from 'react-icons/fi';

import ProductSlider from './ProductSlider/ProductSlider';
import StarRating from '../StarRating/StarRating';
import SaveProductForLaterIcon from '../SaveProductForLaterIcon/SaveProductForLaterIcon';
import { fetchProduct } from '../../actions/products';
import { addToCart } from '../../actions/cart';

import './Product.scss';

// import AddProductToCartIcon from "../ProductListEntry/ProductListEntry";

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  callFetchProduct: PropTypes.func.isRequired,
  imagesDir: PropTypes.string.isRequired,
  routeData: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      department: PropTypes.string,
      page: PropTypes.string
    })
  }),
  onAddToCart: PropTypes.func.isRequired
};

const defaultProps = {
  productData: {
    slug: '',
    pictures: [],
    imagesDir: '',
    name: '',
    prices: {
      retail: 0,
      sale: 0
    }
  },
  onAddToCart: () => {}
};


class Product extends Component {

  componentDidMount() {
    const { routeData: { params }, callFetchProduct } = this.props;
    callFetchProduct(params.product);
  }
addToCart(product){
   const { callAddToCart } = this.props;
   callAddToCart(product);
}

  render() {
    const { productData:{ description, slug, pictures, name, prices }, imagesDir, isFetching, onAddToCart } = this.props;

    return (
      <div className="product" key={slug}>
        <div className="container">
          <div className="productContent">
            {isFetching
              ? <span className="productsList__loader">Loading...</span>
              : (
                <>
                <div style={{position: 'relative', width: '300px', height: '300px' , overflow: 'hidden'}}>
                <ProductSlider
                  images={
                    pictures.map((picture, i) => (
                      { id: i, src: `${imagesDir}/md-${picture}`, alt: '' }
                    ))
                  }
                  settings={{
                    customPaging: i => (<img src={`${imagesDir}/sm-${pictures[i]}`} alt="" />),
                    dots: true,
                    dotsClass: 'slick-dots slick-thumb',
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }}
                />
                </div>
                <div className="productInfo">
                  <p className="productInfo__name">{name}</p>
                  <StarRating className="productInfo__rating"/>
                  <p className="productInfo__price">${prices.retail}</p>
                  <div className="productInfo__buy">
                    <button 
                    className="addProductToCartBtn" 
                    onClick={() => this.addToCart({slug, picture: pictures[0], price: prices.retail, name})}
                    >
                      <FiShoppingBag className="addProductToCartBtn__icon"/>
                      Add to cart
                    </button>
                    <SaveProductForLaterIcon className="saveForLaterBtn__icon"/>
                  </div>
                  <div className="textContent">
                    <p className="productInfo__description">{description}</p>
                  </div>
                </div>
                </>
              )}
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = propTypes;
Product.defaultProps = defaultProps;

const mapStateToProps = state => ({
  productData: state.products.productData,
  isFetching: state.products.isFetching,
  imagesDir: state.products.imagesDir
});

const mapDispatchToProps = dispatch => ({
  callFetchProduct: requestData => dispatch(fetchProduct(requestData)),
  callAddToCart: product => dispatch(addToCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);