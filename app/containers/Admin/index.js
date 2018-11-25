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
import { reloadDotaItem, updateDotaItems } from '../DotaItemsAll/actions';
import DotaItemsTableContainer from '../DotaItemsAll/Loadable';
import DotaItemsTableComponent from '../../components/DataTable/Loadable';

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
      marketHashName: '',
      hero: '',
      rarity: '',
      minPrice: '',
      maxPrice: '',
      sort: '',
    };
  }

  onChangeTradable = e => {
    this.setState({
      tradable: e.target.value,
    });
  };

  onChangeSort = e => {
    this.setState({
      sort: e.target.value,
    });
  };

  onMarketHashNameEditChange = e => {
    this.setState({
      marketHashName: e.target.value,
    });
  };

  onRarityEditChange = e => {
    this.setState({
      rarity: e.target.value,
    });
  };

  onHeroEditChange = e => {
    this.setState({
      hero: e.target.value,
    });
  };

  onMarketRateEditChange = e => {
    this.setState({
      marketRate: e.target.value,
    });
  };

  onMinPriceEditChange = e => {
    this.setState({
      minPrice: e.target.value,
    });
  };

  onMaxPriceEditChange = e => {
    this.setState({
      maxPrice: e.target.value,
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

  onReloadDotaItem = () => {
    this.props.reloadDotaItem({
      marketHashName: this.state.marketHashName,
      hero: this.state.hero,
      rarity: this.state.rarity,
      minPrice: this.state.minPrice,
      maxPrice: this.state.maxPrice,
      marketRate: this.state.marketRate,
      sort: this.state.sort,
    });
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
              onClick={this.onReloadDotaItem}
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
                  select
                  className={classes.textField}
                  id="market-rate"
                  label="Market rate"
                  value={this.state.marketRate}
                  onChange={this.onMarketRateEditChange}
                  margin="dense"
                  type="number"
                >
                  <option value={0.85}>85%</option>
                  <option value={0.9}>90%</option>
                  <option value={0.95}>95%</option>
                  <option value={1}>100%</option>
                  <option value={1.05}>105%</option>
                </TextField>
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
        <Grid container className={classes.grid}>
          <Grid item md={2}>
            <TextField
              className={classes.textField}
              id="market-has-name"
              label="Market Hash Name"
              value={this.state.marketHashName}
              onChange={this.onMarketHashNameEditChange}
              margin="dense"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              className={classes.textField}
              id="hero"
              label="Hero"
              value={this.state.hero}
              onChange={this.onHeroEditChange}
              margin="dense"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              className={classes.textField}
              id="rarity"
              label="Rarity"
              value={this.state.rarity}
              onChange={this.onRarityEditChange}
              margin="dense"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              className={classes.textField}
              id="min-price"
              label="Min Price"
              value={this.state.minPrice}
              onChange={this.onMinPriceEditChange}
              margin="dense"
              type="number"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              className={classes.textField}
              id="max-price"
              label="Max Price"
              value={this.state.maxPrice}
              onChange={this.onMaxPriceEditChange}
              margin="dense"
              type="number"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              select
              className={classes.input}
              id="sort-type"
              label="Sort By"
              value={this.state.sort}
              onChange={this.onChangeSort}
              margin="dense"
              fullWidth
            >
              <option value="">All</option>
              <option value="price-24h">latest 24h price</option>
              <option value="price-7d">latest 7d price</option>
              <option value="price-30d">latest 30 days price</option>
              <option value="name">name</option>
              <option value="hero">hero</option>
              <option value="rarity">rarity</option>
            </TextField>
          </Grid>
        </Grid>
        <br />
        <DotaItemsTableContainer
          renderComponent={prop => (
            <DotaItemsTableComponent
              {...prop}
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
  reloadDotaItem: PropTypes.func.isRequired,
  updateDotaItems: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    reloadDotaItem: q => dispatch(reloadDotaItem(q)),
    updateDotaItems: data => dispatch(updateDotaItems(data)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withStyles(style)(compose(withConnect)(Admin));
