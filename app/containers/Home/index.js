/**
 *
 * Home
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

const styles = () => ({
  input: {
    display: 'none',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.Component {
  renderSelectedItemYou = () => (
    <p>SELECT THE ITEMS YOU WANT TO OFFER FROM THE INVENTORY BOX BELOW</p>
  );

  renderSelectedItemBot = () => (
    <p>SELECT THE ITEMS YOU WANT TO OFFER FROM THE INVENTORY BOX BELOW</p>
  );

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>
        <div className="home-container">
          <div className="header" />
          <div className="body">
            <Grid container>
              <Grid item sm={5} className="select-area offer">
                <div>
                  <div className="pad-10 select-area-header">
                    <Grid container>
                      <Grid item xs={6}>
                        <p className="text-align-left">You Offer</p>
                      </Grid>
                      <Grid item xs={6}>
                        <p className="text-align-right">Money</p>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="pad-10 select-area-body">
                    {this.renderSelectedItemYou()}
                  </div>
                </div>
              </Grid>
              <Grid item sm={2}>
                <div className="toolbar">
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    fullWidth
                  >
                    TRADE
                  </Button>
                </div>
              </Grid>
              <Grid item sm={5} className="select-area receive">
                <div>
                  <div className="pad-10 select-area-header">
                    <Grid container>
                      <Grid item xs={6}>
                        <p className="text-align-left">Money</p>
                      </Grid>
                      <Grid item xs={6}>
                        <p className="text-align-right">You Receive</p>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="pad-10 select-area-body">
                    {this.renderSelectedItemBot()}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(Home);
