import React from 'react';
import PropTypes from 'prop-types';

import styles from './Featured.module.scss';
import { useSelector } from 'react-redux';
import { getFeatured } from '../../../redux/productsRedux';
import FeaturedProduct from '../../common/FeaturedProduct/FeaturedProduct';
import Button from '../../common/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './carousel.scss';

const Featured = () => {
  const featuredProducts = useSelector(getFeatured);
  const [activePage, setActivePage] = useState(0);
  const [visible, setVisible] = useState(true);
  const time = 250;
  const intervalRef = useRef(null); // Store the interval reference

  const intervalFunc = newPage => {
    setVisible(false);
    setTimeout(() => setActivePage(newPage => (newPage + 1) % 3, time));
    setTimeout(() => setVisible(true, time * 2));
  };

  useEffect(() => {
    intervalRef.current = setInterval(intervalFunc, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const pauseAutoPlay = () => {
    clearInterval(intervalRef.current);
    setTimeout(() => {
      intervalRef.current = setInterval(intervalFunc, 3000);
    }, 7000);
  };

  const handlePageChange = newPage => {
    clearInterval(intervalRef.current);
    setVisible(false);
    setTimeout(() => setActivePage(newPage, time));
    setTimeout(() => setVisible(true, time * 2));
    pauseAutoPlay();
  };

  const dots = [];
  for (let i = 0; i < 3; i++) {
    dots.push(
      <li>
        <a
          onClick={() => handlePageChange(i)}
          className={i === activePage && styles.active}
        >
          page {i}
        </a>
      </li>
    );
  }

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            <div className={styles.panelBar}>
              <div className='row no-gutters align-items-end'>
                <div className={'col-auto ' + styles.heading}>
                  <h3>Hot deals</h3>
                </div>
                <div className={'col-auto ' + styles.dots}>
                  <ul>{dots}</ul>
                </div>
              </div>
            </div>
            <div className={styles.productsWrapper + ' ' + (!visible && styles.fade)}>
              {featuredProducts
                .slice(activePage * 1, (activePage + 1) * 1)
                .map(product => (
                  <FeaturedProduct
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    stars={product.stars}
                    oldPrice={product.oldPrice}
                  />
                ))}
            </div>
          </div>
          <div className='col-8'>
            <div className='carouselContainer'>
              <Carousel
                fade
                interval={null}
                indicators={false}
                prevLabel={false}
                nextLabel={false}
                prevIcon={
                  <Button variant='small'>
                    <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                  </Button>
                }
                nextIcon={
                  <Button variant='small'>
                    <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                  </Button>
                }
              >
                <Carousel.Item>
                  <div className={styles.promo}>
                    <img src='images/featured-promo.jpg' alt='Discounted product' />
                    <div className={styles.content}>
                      <p>
                        INDOOR <span>FURNITURE</span>
                      </p>
                      <p>SAVE UP TO 50% OF ALL FURNITURE</p>
                      <Button variant='outline' className='btn-light'>
                        SHOP NOW
                      </Button>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className={styles.promo}>
                    <img src='images/featured-promo.jpg' alt='Discounted product' />
                    <div className={styles.content}>
                      <p>
                        INDOOR <span>FURNITURE</span>
                      </p>
                      <p>SAVE UP TO 50% OF ALL FURNITURE</p>
                      <Button variant='outline' className='btn-light'>
                        SHOP NOW
                      </Button>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className={styles.promo}>
                    <img src='images/featured-promo.jpg' alt='Discounted product' />
                    <div className={styles.content}>
                      <p>
                        INDOOR <span>FURNITURE</span>
                      </p>
                      <p>SAVE UP TO 50% OF ALL FURNITURE</p>
                      <Button variant='outline' className='btn-light'>
                        SHOP NOW
                      </Button>
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Featured.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  price: PropTypes.number,
  promo: PropTypes.string,
  stars: PropTypes.number,
  id: PropTypes.number,
};

export default Featured;
