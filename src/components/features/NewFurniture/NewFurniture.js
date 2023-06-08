import React from 'react';
import PropTypes from 'prop-types';

import Swipeable from '../../common/Swipeable/Swipeable';

import styles from './NewFurniture.module.scss';
import ProductBox from '../../common/ProductBox/ProductBox';

class NewFurniture extends React.Component {
  state = {
    activePage: 0,
    activeCategory: 'bed',
  };

  handlePageChange = newPage => {
    this.setState({ activePage: newPage });
  };

  handleCategoryChange = newCategory => {
    this.setState({ activeCategory: newCategory });
  };

  // Swipeable action functions
  handleSwipeLeft = () => {
    const { activePage } = this.state;
    if (activePage < this.calculatePagesCount() - 1) {
      this.setState({ activePage: activePage + 1 });
    }
  };

  handleSwipeRight = () => {
    const { activePage } = this.state;
    if (activePage > 0) {
      this.setState({ activePage: activePage - 1 });
    }
  };

  calculatePagesCount = () => {
    const { products } = this.props;
    const { activeCategory } = this.state;
    const categoryProducts = products.filter(item => item.category === activeCategory);
    return Math.ceil(categoryProducts.length / 8);
  };

  render() {
    const { categories, products } = this.props;
    const { activeCategory, activePage } = this.state;
    const pagesCount = this.calculatePagesCount();

    const dots = [];
    for (let i = 0; i < pagesCount; i++) {
      dots.push(
        <li key={i}>
          <a
            onClick={() => this.handlePageChange(i)}
            className={i === activePage ? styles.active : ''}
          >
            page {i}
          </a>
        </li>
      );
    }

    const categoryProducts = products.filter(item => item.category === activeCategory);
    const displayedProducts = categoryProducts.slice(
      activePage * 8,
      (activePage + 1) * 8
    );

    return (
      <Swipeable leftAction={this.handleSwipeLeft} rightAction={this.handleSwipeRight}>
        <div className={styles.root}>
          <div className='container'>
            <div className={styles.panelBar}>
              <div className='row no-gutters align-items-end'>
                <div className={'col-auto ' + styles.heading}>
                  <h3>New furniture</h3>
                </div>
                <div className={'col ' + styles.menu}>
                  <ul>
                    {categories.map(item => (
                      <li key={item.id}>
                        <a
                          className={item.id === activeCategory && styles.active}
                          onClick={() => this.handleCategoryChange(item.id)}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={'col-auto ' + styles.dots}>
                  <ul>{dots}</ul>
                </div>
              </div>
            </div>
            <div className='row'>
              {displayedProducts.map(item => (
                <div key={item.id} className='col-3'>
                  <ProductBox {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Swipeable>
    );
  }
}

NewFurniture.propTypes = {
  children: PropTypes.node,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
      stars: PropTypes.number,
      promo: PropTypes.string,
      newFurniture: PropTypes.bool,
    })
  ),
};

NewFurniture.defaultProps = {
  categories: [],
  products: [],
};

export default NewFurniture;
