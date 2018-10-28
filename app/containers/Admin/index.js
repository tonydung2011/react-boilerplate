/**
 *
 * Admin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import messages from './messages';
import { loadAllDotaItems } from '../DotaItemsAll/actions';
import DotaItemsTableContainer from '../DotaItemsAll/Loadable';
import DotaItemsTableComponent from '../../components/DataTable';

const style = () => ({
  grid: {
    marginLeft: 10,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class Admin extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Helmet>
          <title>Admin</title>
          <meta name="description" content="Description of Admin" />
        </Helmet>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <h2>
              <FormattedMessage {...messages.header} />
            </h2>
            <br />
          </Grid>
        </Grid>
        <Grid container justify="flex-start" className={classes.grid}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.loadAllDotaItems}
            >
              <FormattedMessage {...messages.reload} />
            </Button>
          </Grid>
        </Grid>
        <br />
        <DotaItemsTableContainer
          renderComponent={data => <DotaItemsTableComponent data={data} />}
        />
      </div>
    );
  }
}

Admin.propTypes = {
  loadAllDotaItems: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    loadAllDotaItems: () => dispatch(loadAllDotaItems()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withStyles(style)(compose(withConnect)(Admin));
