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
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RefreshIcon from '@material-ui/icons/Refresh';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const styles = () => ({
  input: {
    display: 'none',
  },
  icon: {
    marginTop: 'auto',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        minPrice: 0,
        maxPrice: 9999,
        hero: '',
        rarity: '',
      },
      player: {
        sort: '',
        search: '',
      },
    };
  }

  renderSelectedItemYou = () => (
    <p>SELECT THE ITEMS YOU WANT TO OFFER FROM THE INVENTORY BOX BELOW</p>
  );

  renderSelectedItemBot = () => (
    <p>SELECT THE ITEMS YOU WANT TO OFFER FROM THE INVENTORY BOX BELOW</p>
  );

  onChangePrice = field => event => {
    const value = typeof event === 'object' ? event.target.value : event;
    this.setState({
      filter: {
        ...this.state.filter,
        [field]: value || 0,
      },
    });
  };

  onChangePlayer = field => event => {
    const value = typeof event === 'object' ? event.target.value : event;
    this.setState({
      player: {
        ...this.state.player,
        [field]: value,
      },
    });
  };

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
                <div id="item-selected-area">
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
                <br />
                <div id="item-list-user">
                  <div>
                    <div className="pad-10 select-area-header">
                      <Grid container>
                        <Grid item sm={3}>
                          <RefreshIcon className={classes.icon} />
                        </Grid>
                        <Grid item sm={4}>
                          <FormControl>
                            <InputLabel htmlFor="age-simple">Order</InputLabel>
                            <Select
                              value={this.state.player.sort}
                              onChange={this.onChangePlayer('sort')}
                              inputProps={{
                                name: 'Order',
                                id: 'order-id',
                              }}
                            >
                              <MenuItem value="price">Price</MenuItem>
                              <MenuItem value="name">Name</MenuItem>
                              <MenuItem value="hero">hero</MenuItem>
                              <MenuItem value="rarity">rarity</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item sm={5}>
                          <TextField
                            id="item-player-search-field"
                            label="Search"
                            value={this.state.player.search}
                            onChange={this.onChangePlayer('search')}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className="pad-10 select-area-body" id="items-list" />
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
                <div className="toolbar-filter">
                  <div className="pad-10 select-area-header">
                    <p className="text-align-center">BOT FILTER</p>
                  </div>
                  <div className="pad-10 select-area-body">
                    <div id="price-filter">
                      <p className="text-align-center margin-y-0">PRICE</p>
                      <Grid container spacing={8}>
                        <Grid item sm={6}>
                          <TextField
                            id="item-filter-min-price"
                            label="Min"
                            value={this.state.filter.minPrice}
                            onChange={this.onChangePrice('minPrice')}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                            fullWidth
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextField
                            id="item-filter-max-price"
                            label="Max"
                            value={this.state.filter.maxPrice}
                            onChange={this.onChangePrice('maxPrice')}
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <Range
                        min={0}
                        max={9999}
                        defaultValue={[3, 9999]}
                        value={[
                          this.state.filter.minPrice,
                          this.state.filter.maxPrice,
                        ]}
                        onChange={arg => {
                          this.onChangePrice('minPrice')(arg[0]);
                          this.onChangePrice('maxPrice')(arg[1]);
                        }}
                        tipFormatter={value => `${value}$`}
                      />
                    </div>
                    <div id="hero-filter">
                      <TextField
                        id="item-filter-hero"
                        label="Hero"
                        value={this.state.filter.hero}
                        onChange={this.onChangePrice('hero')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        fullWidth
                      />
                    </div>
                    <div id="hero-rarity">
                      <TextField
                        id="item-filter-rarity"
                        label="rarity"
                        value={this.state.filter.rarity}
                        onChange={this.onChangePrice('rarity')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        fullWidth
                      />
                    </div>
                  </div>
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
