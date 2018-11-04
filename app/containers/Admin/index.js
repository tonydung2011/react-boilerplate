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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import messages from './messages';
import { loadAllDotaItems, updateDotaItems } from '../DotaItemsAll/actions';
import DotaItemsTableContainer from '../DotaItemsAll/Loadable';
import DotaItemsTableComponent from '../../components/DataTable';

const style = theme => ({
  grid: {
    marginLeft: 10,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  formControl: {
    marginTop: 7,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tradable: true,
      marketRate: '1',
    };
  }

  onChangeTradable = e => {
    this.setState({
      tradable: e.target.value,
    });
  };

  onMarketRateEditChange = e => {
    this.setState({
      marketRate: e.target.value,
    });
  };

  updateData = () => {
    const selectedItems = this.table.state.selection; /* eslint-disable-line */
    const updateData = selectedItems.map(item => ({
      market_hash_name: item.market_hash_name,
      tradable: this.state.tradable,
      marketRate: this.state.marketRate,
    }));
    this.props.updateDotaItems(updateData);
  };

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
          <Grid item md={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.loadAllDotaItems}
            >
              <FormattedMessage {...messages.reload} />
            </Button>
          </Grid>
          <Grid item md={6}>
            <Grid container>
              <Grid item md={2}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">trade</InputLabel>
                  <Select
                    value={this.state.tradable}
                    onChange={this.onChangeTradable}
                    inputProps={{
                      name: 'tradable',
                      id: 'tradable-id',
                    }}
                  >
                    <MenuItem value={false}>Not trade</MenuItem>
                    <MenuItem value>trade</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4}>
                <TextField
                  className={classes.textField}
                  id="market-rate"
                  label="Market rate"
                  value={this.state.marketRate}
                  onChange={this.onMarketRateEditChange}
                  margin="dense"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.updateData}
                >
                  <FormattedMessage {...messages.update} />
                </Button>
              </Grid>
              <Grid item md={3} />
            </Grid>
          </Grid>
        </Grid>
        <br />
        <DotaItemsTableContainer
          renderComponent={data => (
            <DotaItemsTableComponent
              data={data}
              onMount={ref => {
                this.table = ref;
              }}
            />
          )}
        />
      </div>
    );
  }
}

Admin.propTypes = {
  loadAllDotaItems: PropTypes.func.isRequired,
  updateDotaItems: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    loadAllDotaItems: () => dispatch(loadAllDotaItems()),
    updateDotaItems: data => dispatch(updateDotaItems(data)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withStyles(style)(compose(withConnect)(Admin));
