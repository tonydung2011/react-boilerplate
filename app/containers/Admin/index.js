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
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Spinner from 'react-spinkit';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import styles from './styles';
import messages from './messages';
import DataTable from '../../components/DataTable/Loadable';
import makeSelectDotaItemsAll, {
  selectDotaItemsData,
  selectDotaItemsError,
  selectDotaItemsLoaded,
  selectDotaItemsLoading,
  selectDotaItemsPage,
  selectDotaItemsLimit,
  selectDotaItemsTotal,
  selectAuthenticated,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getDotaItems,
  reloadDotaItem,
  updateDotaItems,
  submitPassword,
  submitPasswordFail,
} from './actions';

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
      overstock: '',
    };
  }

  componentDidMount = () => {
    if (this.props.authenticated === 'success') {
      this.props.reloadDotaItem({});
    } else if (window.localStorage.getItem('tradewithme/admin')) {
      this.props.submitPassword(
        window.localStorage.getItem('tradewithme/admin'),
      );
    }
  };

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

  onOverstockChange = e => {
    this.setState({
      overstock: e.target.value,
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value,
    });
  };

  updateData = () => {
    const selectedItems = this.table.state.selection; /* eslint-disable-line */
    const updateData = selectedItems.map(item => ({
      marketHashName: item.marketHashName,
      tradable: this.state.tradable,
      marketRate: this.state.marketRate,
      overstock: this.state.overstock,
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
        {this.props.authenticated === 'success' && (
          <React.Fragment>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <h2>
                  <FormattedMessage {...messages.header} />
                </h2>
                <br />
              </Grid>
            </Grid>
            <Grid container justify="flex-start" className={classes.grid}>
              <Grid item md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onReloadDotaItem}
                >
                  <FormattedMessage {...messages.reload} />
                </Button>
                <Button
                  variant="contained"
                  onClick={this.props.submitPasswordFail}
                >
                  <FormattedMessage {...messages.clearSession} />
                </Button>
              </Grid>
              <Grid item md={8}>
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
                    <TextField
                      className={classes.textField}
                      id="overstock"
                      label="Overstock"
                      value={this.state.overstock}
                      onChange={this.onOverstockChange}
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
            <DataTable
              data={this.props.data}
              loading={this.props.loading}
              error={this.props.error}
              pages={this.props.pages}
              page={this.props.page}
              limit={this.props.limit}
              total={this.props.total}
              onFetchData={this.props.onFetchData}
              updatePage={page =>
                this.props.reloadDotaItem({
                  page,
                })
              }
              updateLimit={limit => this.props.reloadDotaItem({ limit })}
              onMount={ref => {
                this.table = ref;
              }}
            />
          </React.Fragment>
        )}
        {this.props.authenticated !== 'success' && (
          <Grid container>
            <Grid item sm={4} />
            <Grid item sm={4}>
              <form className="margin-top-30vh">
                <Typography variant="title" className={classes.title}>
                  <FormattedMessage {...messages.authenticatedRequired} />
                </Typography>
                <TextField
                  className={classes.textField}
                  id="password-admin"
                  label="Password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  margin="normal"
                  fullWidth
                  onSubmit={() =>
                    this.props.submitPassword(this.state.password)
                  }
                  helperText={
                    this.props.authenticated === 'fail'
                      ? 'wrong password'
                      : 'password required'
                  }
                />
                <br />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.props.submitPassword(this.state.password)}
                >
                  <FormattedMessage {...messages.submit} />
                </Button>
              </form>
            </Grid>
            <Grid item sm={4} />
          </Grid>
        )}
        <Modal open={this.props.authenticated === 'loading'}>
          <Spinner className="center" name="folding-cube" color="white" />
        </Modal>
      </div>
    );
  }
}

Admin.propTypes = {
  reloadDotaItem: PropTypes.func.isRequired,
  updateDotaItems: PropTypes.func.isRequired,
  classes: PropTypes.object,
  onFetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  authenticated: PropTypes.string.isRequired,
  submitPassword: PropTypes.func.isRequired,
  submitPasswordFail: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dotaItemsAll: makeSelectDotaItemsAll(),
  data: selectDotaItemsData(),
  error: selectDotaItemsError(),
  loaded: selectDotaItemsLoaded(),
  loading: selectDotaItemsLoading(),
  page: selectDotaItemsPage(),
  limit: selectDotaItemsLimit(),
  total: selectDotaItemsTotal(),
  authenticated: selectAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    reloadDotaItem: q => dispatch(reloadDotaItem(q)),
    updateDotaItems: data => dispatch(updateDotaItems(data)),
    onFetchData: () => dispatch(getDotaItems()),
    submitPassword: pass => dispatch(submitPassword(pass)),
    submitPasswordFail: () => dispatch(submitPasswordFail()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'Admin', reducer });
const withSaga = injectSaga({ key: 'Admin', saga });

export default withStyles(styles)(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(Admin),
);
