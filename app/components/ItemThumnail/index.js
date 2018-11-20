/**
 *
 * ItemThumnail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactHover from 'react-hover';
import _ from 'lodash';
import { Typography, withStyles } from '@material-ui/core';

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: 20,
  shiftY: 0,
};

const style = () => ({
  whiteText: {
    color: 'white',
  },
});

const getValueFromTag = (tags, category) => {
  const tag = _.find(tags, t => t.category === category);
  return tag && tag.localized_tag_name ? tag.localized_tag_name : '';
};

function ItemThumnail({ component, classes }) {
  return (
    <ReactHover options={optionsCursorTrueWithMargin}>
      <ReactHover.Trigger type="trigger">
        <div>
          <img
            src={component.image}
            width="100%"
            height="auto"
            alt={component.name}
            style={{ opacity: 1 }}
          />
          <Typography className={classes.whiteText}>
            {component.name}
          </Typography>
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
          <Typography variant="subtitle1" className={classes.whiteText}>
            {component.name}
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
      </ReactHover.Hover>
    </ReactHover>
  );
}

ItemThumnail.propTypes = {
  component: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(ItemThumnail);
