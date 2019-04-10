/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/**
 *
 * ItemThumnail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactHover from 'react-hover';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import uuid from 'uuid/v1';
import { getValueFromTag } from 'utils/utils';
import styles from './styles';

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: 20,
  shiftY: 0,
};

const getHelpText = state =>
  state === 'Unavailable'
    ? 'There are several reasons for this item is unavailable. The item is not popular. A big number of one and the same items on our accounts and that the skin is one of the permanent blocked one'
    : 'Overstock means this item cannot be choosen at the moment. The reason of it is there are too many such item on our site now';

function ItemThumnail({ component, classes, onClickHandler, validate }) {
  return (
    <ReactHover options={optionsCursorTrueWithMargin} key={uuid()}>
      <ReactHover.Trigger type="trigger">
        <div
          onClick={validate.valid ? onClickHandler : undefined}
          className={classes.itemContainer}
        >
          <div>
            <div className={classes.gemContainer} />
            <img
              src={component.image}
              width="100%"
              height="auto"
              alt={component.marketHashName}
              style={{
                opacity: validate.valid ? 1 : 0.5,
                backgroundColor: validate.valid ? undefined : '##747376',
              }}
            />
          </div>
          <div className={classes.priceContainer}>
            {validate.valid ? (
              <Typography
                className={classes.priceText}
                variant="subheading"
                align="center"
              >
                {_.round(component.price, 4)} $
              </Typography>
            ) : (
              <Typography
                align="center"
                className={classes.disableText}
                variant="subheading"
              >
                {validate.state}
              </Typography>
            )}
          </div>
        </div>
      </ReactHover.Trigger>
      <ReactHover.Hover type="hover">
        <div
          style={{
            padding: 10,
            backgroundColor: '#171d21',
            opacity: 1,
            color: 'white',
          }}
        >
          {validate.valid ? (
            <div>
              <Typography variant="subtitle1" className={classes.whiteText}>
                {component.marketHashName}
              </Typography>
              <p>
                <span style={{ color: '#DA7323' }}>Hero: </span>
                {getValueFromTag(component.tags, 'Hero')}
              </p>
              <p>
                <span style={{ color: '#07A244' }}>Rarity: </span>
                {component.rarity}
              </p>
              <p>
                <span style={{ color: '#088FD4' }}>Type: </span>
                {getValueFromTag(component.tags, 'Type')}
              </p>
            </div>
          ) : (
            <div
              style={{
                width: '12rem',
              }}
            >
              <Typography variant="body1" className={classes.disableText}>
                {getHelpText(validate.state)}
              </Typography>
            </div>
          )}
        </div>
      </ReactHover.Hover>
    </ReactHover>
  );
}

ItemThumnail.propTypes = {
  component: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onClickHandler: PropTypes.func,
  validate: PropTypes.object,
};

ItemThumnail.defaultProps = {
  validate: { valid: true },
};

export default withStyles(styles)(ItemThumnail);
