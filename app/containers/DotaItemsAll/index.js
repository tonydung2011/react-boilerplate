/**
 *
 * DotaItemsAll
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Spinner from 'react-spinkit';
import Grid from '@material-ui/core/Grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDotaItemsAll, {
  selectDotaItemsData,
  selectDotaItemsError,
  selectDotaItemsLoaded,
  selectDotaItemsLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class DotaItemsAll extends React.Component {
  render() {
    return (
      <div>
        {this.props.loading && this.props.renderLoading()}
        {this.props.loaded && this.props.error && this.props.renderError()}
        {this.props.loaded &&
          !this.props.error &&
          this.props.renderComponent(this.props.data.toJS())}
      </div>
    );
  }
}

DotaItemsAll.propTypes = {
  renderComponent: PropTypes.func.isRequired,
  renderLoading: PropTypes.func,
  renderError: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
};

DotaItemsAll.defaultProps = {
  renderLoading: () => (
    <Grid container justify="center">
      <Grid item>
        <Spinner name="folding-cube" />
      </Grid>
    </Grid>
  ),
  renderError: () => <FormattedMessage {...messages.error} />,
};

const mapStateToProps = createStructuredSelector({
  dotaItemsAll: makeSelectDotaItemsAll(),
  data: selectDotaItemsData(),
  error: selectDotaItemsError(),
  loaded: selectDotaItemsLoaded(),
  loading: selectDotaItemsLoading(),
});

function mapDispatchToProps() {
  return {};
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
