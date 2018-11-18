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
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RefreshIcon from '@material-ui/icons/Refresh';
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
    color: 'white',
  },
  icon: {
    marginTop: 'auto',
  },
  tradeButton: {
    backgroundColor: '#4582A2',
    borderColor: '#4582A2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#11BCC2',
      borderColor: '#11BCC2',
    },
  },
  textFieldInput: {
    color: 'white',
  },
  textFieldLabel: {
    color: 'white',
    '&$formLabelFocused': {
      color: 'white',
    },
  },
  formLabelFocused: {
    color: 'white',
  },
  textFieldBottomLine: {
    borderBottom: '0.5px solid white',
    '&:focus': {
      borderBottom: '1px solid white',
    },
    '&:hover': {
      borderBottom: '1px solid white',
    },
  },
  selectControl: {
    width: '80%',
  },
  iconSelect: {
    color: 'white',
  },
  subTitle: {
    color: 'white',
  },
  h6: {
    color: 'white',
  },
  appBar: {
    backgroundColor: '#171d21',
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

  renderSelectedItemYou = classes => (
    <Typography className={classes.subTitle}>
      SELECT THE ITEMS YOU WANT TO OFFER FROM THE INVENTORY BOX BELOW
    </Typography>
  );

  renderSelectedItemBot = classes => (
    <Typography className={classes.subTitle}>
      SELECT THE ITEMS YOU WANT TO OFFER FROM THE INVENTORY BOX BELOW
    </Typography>
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

  refreshPlayerItems = () => {
    console.log('click refresh');
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
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                TRADE WITH ME
              </Typography>
              {/* {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  </Menu>
                </div>
              )} */}
            </Toolbar>
          </AppBar>
          <div className="body">
            <Grid container>
              <Grid item sm={5} className="select-area offer">
                <div id="item-selected-area">
                  <div className="pad-10 select-area-header">
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography
                          variant="subtitle1"
                          className={`text-align-left ${classes.subTitle}`}
                        >
                          You Offer
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="subtitle1"
                          className={`text-align-right ${classes.subTitle}`}
                        >
                          Money
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="pad-10 select-area-body">
                    {this.renderSelectedItemYou(classes)}
                  </div>
                </div>
                <br />
                <div id="item-list-user">
                  <div>
                    <div className="pad-10 select-area-header">
                      <Grid container spacing={8}>
                        <Grid item sm={2}>
                          <div className="refresh-icon-wrapper">
                            <Grid container justify="center">
                              <Grid item>
                                <RefreshIcon
                                  className={classes.icon}
                                  onClick={this.refreshPlayerItems}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid item sm={5}>
                          <TextField
                            id="item-player-order-field"
                            label="Order"
                            className={classes.input}
                            value={this.state.player.sort}
                            onChange={this.onChangePlayer('sort')}
                            select
                            SelectProps={{
                              native: true,
                              inputProps: {
                                className: classes.textFieldInput,
                                classes: {
                                  icon: classes.iconSelect,
                                },
                              },
                            }}
                            InputProps={{
                              classes: {
                                underline: classes.textFieldBottomLine,
                              },
                            }}
                            InputLabelProps={{
                              FormLabelClasses: {
                                root: classes.textFieldLabel,
                                focused: classes.formLabelFocused,
                              },
                              shrink: true,
                            }}
                            margin="dense"
                            fullWidth
                          >
                            <option value="price">Price</option>
                            <option value="name">Name</option>
                            <option value="hero">hero</option>
                            <option value="rarity">rarity</option>
                          </TextField>
                        </Grid>
                        <Grid item sm={5}>
                          <TextField
                            className={classes.input}
                            id="item-player-search-field"
                            label="Search"
                            value={this.state.player.search}
                            onChange={this.onChangePlayer('search')}
                            margin="dense"
                            fullWidth
                            InputProps={{
                              className: classes.textFieldInput,
                              classes: {
                                underline: classes.textFieldBottomLine,
                              },
                            }}
                            InputLabelProps={{
                              FormLabelClasses: {
                                root: classes.textFieldLabel,
                                focused: classes.formLabelFocused,
                              },
                              shrink: true,
                            }}
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
                    className={classes.tradeButton}
                    fullWidth
                  >
                    TRADE
                  </Button>
                </div>
                <div className="toolbar-filter">
                  <div className="pad-10 select-area-header">
                    <Typography
                      variant="subtitle1"
                      className={`text-align-center ${classes.subTitle}`}
                    >
                      BOT FILTER
                    </Typography>
                  </div>
                  <div className="pad-10 select-area-body">
                    <div id="price-filter">
                      <Typography
                        variant="subtitle1"
                        className={`text-align-center margin-y-0 ${
                          classes.subTitle
                        }`}
                      >
                        PRICE
                      </Typography>
                      <Grid container spacing={8}>
                        <Grid item sm={6}>
                          <TextField
                            className={classes.input}
                            id="item-filter-min-price"
                            label="Min"
                            value={this.state.filter.minPrice}
                            onChange={this.onChangePrice('minPrice')}
                            type="number"
                            InputProps={{
                              className: classes.textFieldInput,
                              classes: {
                                underline: classes.textFieldBottomLine,
                              },
                            }}
                            InputLabelProps={{
                              FormLabelClasses: {
                                root: classes.textFieldLabel,
                                focused: classes.formLabelFocused,
                              },
                            }}
                            margin="dense"
                            fullWidth
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextField
                            className={classes.input}
                            id="item-filter-max-price"
                            label="Max"
                            value={this.state.filter.maxPrice}
                            onChange={this.onChangePrice('maxPrice')}
                            type="number"
                            InputProps={{
                              className: classes.textFieldInput,
                              classes: {
                                underline: classes.textFieldBottomLine,
                              },
                            }}
                            InputLabelProps={{
                              FormLabelClasses: {
                                root: classes.textFieldLabel,
                                focused: classes.formLabelFocused,
                              },
                            }}
                            margin="dense"
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
                        className={classes.input}
                        id="item-filter-hero"
                        label="Hero"
                        value={this.state.filter.hero}
                        onChange={this.onChangePrice('hero')}
                        InputProps={{
                          className: classes.textFieldInput,
                          classes: {
                            underline: classes.textFieldBottomLine,
                          },
                        }}
                        InputLabelProps={{
                          FormLabelClasses: {
                            root: classes.textFieldLabel,
                            focused: classes.formLabelFocused,
                          },
                        }}
                        margin="dense"
                        fullWidth
                      />
                    </div>
                    <div id="hero-rarity">
                      <TextField
                        select
                        className={classes.input}
                        id="item-filter-rarity"
                        label="Rarity"
                        value={this.state.filter.rarity}
                        onChange={this.onChangePrice('rarity')}
                        SelectProps={{
                          native: true,
                          inputProps: {
                            className: classes.textFieldInput,
                            classes: {
                              icon: classes.iconSelect,
                            },
                          },
                        }}
                        InputProps={{
                          classes: {
                            underline: classes.textFieldBottomLine,
                          },
                        }}
                        InputLabelProps={{
                          FormLabelClasses: {
                            root: classes.textFieldLabel,
                            focused: classes.formLabelFocused,
                          },
                          shrink: true,
                        }}
                        margin="dense"
                        fullWidth
                      >
                        <option value="">All</option>
                        <option value="uncommon">uncommon</option>
                        <option value="common">common</option>
                        <option value="rare">rare</option>
                        <option value="immortal">immortal</option>
                        <option value="legendary">legendary</option>
                        <option value="mythical">mythical</option>
                        <option value="arcana">arcana</option>
                      </TextField>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item sm={5} className="select-area receive">
                <div id="selected-bot-item">
                  <div className="pad-10 select-area-header">
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography
                          variant="subtitle1"
                          className={`text-align-left ${classes.subTitle}`}
                        >
                          Money
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="subtitle1"
                          className={`text-align-right ${classes.subTitle}`}
                        >
                          You Receive
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="pad-10 select-area-body">
                    {this.renderSelectedItemBot(classes)}
                  </div>
                </div>
                <br />
                <div id="item-list-bot">
                  <div>
                    <div className="pad-10 select-area-header">
                      <Grid container spacing={8}>
                        <Grid item sm={2}>
                          <div className="refresh-icon-wrapper">
                            <Grid container justify="center">
                              <Grid item>
                                <RefreshIcon
                                  className={classes.icon}
                                  onClick={this.refreshPlayerItems}
                                />
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid item sm={5}>
                          <TextField
                            id="item-player-order-field"
                            select
                            label="Order"
                            className={classes.input}
                            value={this.state.player.sort}
                            onChange={this.onChangePlayer('sort')}
                            SelectProps={{
                              native: true,
                              inputProps: {
                                className: classes.textFieldInput,
                                classes: {
                                  icon: classes.iconSelect,
                                },
                              },
                            }}
                            InputProps={{
                              classes: {
                                underline: classes.textFieldBottomLine,
                              },
                            }}
                            InputLabelProps={{
                              FormLabelClasses: {
                                root: classes.textFieldLabel,
                                focused: classes.formLabelFocused,
                              },
                              shrink: true,
                            }}
                            margin="dense"
                            fullWidth
                          >
                            <option value="price">Price</option>
                            <option value="name">Name</option>
                            <option value="hero">hero</option>
                            <option value="rarity">rarity</option>
                          </TextField>
                        </Grid>
                        <Grid item sm={5}>
                          <TextField
                            className={classes.input}
                            id="item-player-search-field"
                            label="Search"
                            value={this.state.player.search}
                            onChange={this.onChangePlayer('search')}
                            margin="dense"
                            fullWidth
                            InputProps={{
                              className: classes.textFieldInput,
                              classes: {
                                underline: classes.textFieldBottomLine,
                              },
                            }}
                            InputLabelProps={{
                              FormLabelClasses: {
                                root: classes.textFieldLabel,
                                focused: classes.formLabelFocused,
                              },
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <div className="pad-10 select-area-body" id="items-list" />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <AppBar position="static" className={`pad-10 ${classes.appBar}`}>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            TRADE WITH ME
          </Typography>
        </AppBar>
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
