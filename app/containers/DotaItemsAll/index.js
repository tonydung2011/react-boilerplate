/**
 *
 * DotaItemsAll
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDotaItemsAll, {
  selectDotaItemsData,
  selectDotaItemsError,
  selectDotaItemsLoaded,
  selectDotaItemsLoading,
  selectDotaItemsPage,
  selectDotaItemsLimit,
  selectDotaItemsTotal,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadDotaItems, updateLimit, updatePage } from './actions';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class DotaItemsAll extends React.Component {
  render() {
    return (
      <div>
        {this.props.renderComponent({
          data: this.props.data,
          loading: this.props.loading,
          loaded: this.props.loaded,
          limit: this.props.limit,
          page: this.props.page,
          error: this.props.error,
          total: this.props.total,
          onFetchData: this.props.onFetchData,
          updatePage: this.props.updatePage,
          updateLimit: this.props.updateLimit,
        })}
      </div>
    );
  }
}

DotaItemsAll.propTypes = {
  renderComponent: PropTypes.func.isRequired,
  onFetchData: PropTypes.func.isRequired,
  updateLimit: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

DotaItemsAll.defaultProps = {};

const mapStateToProps = createStructuredSelector({
  dotaItemsAll: makeSelectDotaItemsAll(),
  data: selectDotaItemsData(),
  error: selectDotaItemsError(),
  loaded: selectDotaItemsLoaded(),
  loading: selectDotaItemsLoading(),
  page: selectDotaItemsPage(),
  limit: selectDotaItemsLimit(),
  total: selectDotaItemsTotal(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchData: () => dispatch(loadDotaItems()),
    updatePage: page => dispatch(updatePage(page)),
    updateLimit: limit => dispatch(updateLimit(limit)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dotaItemsAll', reducer });
const withSaga = injectSaga({ key: 'dotaItemsAll', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DotaItemsAll);
