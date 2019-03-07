import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'lodash';

export const getValueFromTag = (tags, category) => {
  const tag = _.find(tags, t => t.category === category);
  return tag && tag.localized_tag_name ? tag.localized_tag_name : '';
};

export const navigateToPage = path => ({
  type: LOCATION_CHANGE,
  payload: {
    location: {
      pathname: path,
      search: '',
      hash: '',
    },
    action: 'push',
  },
});
