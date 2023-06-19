import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Homepage.module.scss';
import FeatureBoxes from '../../features/FeatureBoxes/FeatureBoxes';
import NewFurniture from '../../features/NewFurniture/NewFurnitureContainer';
import Deals from '../../features/Deals/Deals';
import Featured from '../../features/Featured/Featured';

const Homepage = () => (
  <div className={styles.root}>
    <Featured />
    <FeatureBoxes />
    <Deals />
    <NewFurniture />
  </div>
);

// Homepage.propTypes = {};

export default Homepage;
