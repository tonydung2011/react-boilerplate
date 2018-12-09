/**
 *
 * Home
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Spinner from 'react-spinkit';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import Modal from '@material-ui/core/Modal';
import MenuItem from '@material-ui/core/MenuItem';
import RefreshIcon from '@material-ui/icons/Refresh';
import { withStyles } from '@material-ui/core/styles';

import ItemThumnail from 'components/ItemThumnail';

import injectReducer from 'utils/injectReducer';
import Config from 'utils/config';
import { getValueFromTag } from 'utils/utils';
import { selectBot, selectUser, selectTrade } from './selectors';
import reducer from './reducer';
import {
  getBotItems,
  callSteamAuthenticate,
  logout,
  selectPlayerItem,
  selectBotItem,
  removeBotItem,
  removePlayerItem,
  updateTradeUrl,
  toggleTradeUrlInputModal,
  toggleResultModal,
  createNewOffer,
} from './actions';
import messages from './messages';
import styles from './styles';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

/* eslint-disable react/prefer-stateless-function */
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      botFilter: {
        minPrice: 0,
        maxPrice: 9999,
        hero: '',
        rarity: '',
        order: '',
        search: '',
      },
      botItems: [],
      playerItems: [],
      playerFilter: {
        order: '',
        search: '',
      },
      showPlayerMenu: false,
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.bot !== this.props.bot) {
      if (
        nextProps.bot.loaded &&
        !nextProps.bot.error &&
        !nextProps.bot.loading
      ) {
        this.setState({
          botItems: this.filterRemainingItems(
            nextProps.bot.items,
            this.props.trade.itemsReceive,
          ),
        });
      }
    }
    if (nextProps.player !== this.props.player) {
      if (
        nextProps.player.loaded &&
        !nextProps.player.error &&
        !nextProps.player.loading
      ) {
        this.setState({
          playerItems: this.filterRemainingItems(
            nextProps.player.items,
            this.props.trade.itemsOffer,
          ),
        });
      }
    }
    if (nextProps.trade !== this.props.trade) {
      if (
        nextProps.trade.itemsReceive.length !==
        this.props.trade.itemsReceive.length
      ) {
        this.setState({
          botItems: this.filterRemainingItems(
            this.props.bot.items,
            nextProps.trade.itemsReceive,
          ),
        });
      }
      if (
        nextProps.trade.itemsOffer.length !== this.props.trade.itemsOffer.length
      ) {
        this.setState({
          playerItems: this.filterRemainingItems(
            this.props.player.items,
            nextProps.trade.itemsOffer,
          ),
        });
      }
    }
  };

  filterRemainingItems = (source, selected) =>
    _.filter(
      source,
      item => !_.includes(_.map(selected, i => i.assetid), item.assetid),
    );

  componentWillMount = () => {
    this.props.getBotItems();
  };

  renderSelectedItemPLayer = classes =>
    this.props.trade.itemsOffer.length === 0 ? (
      <Typography className={classes.subTitle}>
        <FormattedMessage
          {...messages.selectedItems}
          values={{
            action: 'OFFER',
          }}
        />
      </Typography>
    ) : (
      <Grid container spacing={8}>
        {_.map(this.props.trade.itemsOffer, item => (
          <Grid
            item
            xl={2}
            sm={4}
            md={3}
            key={`player-selected-item-${item.assetid}`}
          >
            <ItemThumnail
              component={item}
              onClickHandler={() => this.props.removePlayerItem(item)}
            />
          </Grid>
        ))}
      </Grid>
    );

  renderSelectedItemBot = classes =>
    this.props.trade.itemsReceive.length === 0 ? (
      <Typography className={classes.subTitle}>
        <FormattedMessage
          {...messages.selectedItems}
          values={{
            action: 'RECEIVE',
          }}
        />
      </Typography>
    ) : (
      <Grid container spacing={8}>
        {_.map(this.props.trade.itemsReceive, item => (
          <Grid
            item
            xl={2}
            sm={4}
            md={3}
            key={`bot-selected-item-${item.assetid}`}
          >
            <ItemThumnail
              component={item}
              onClickHandler={() => this.props.removeBotItem(item)}
            />
          </Grid>
        ))}
      </Grid>
    );

  renderBotItems = classes => {
    if (!this.props.bot.loaded && this.props.bot.loading) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.fullSpace}
        >
          <Grid item>
            <Spinner name="folding-cube" color="white" />
          </Grid>
        </Grid>
      );
    }

    if (this.props.bot.loaded && this.props.bot.error) {
      return (
        <Typography variant="h6" className={classes.subTitle}>
          <FormattedMessage {...messages.someThingWrong} />
        </Typography>
      );
    }
    return (
      <Grid container spacing={8}>
        {_.map(this.botFilter(this.state.botItems), item => (
          <Grid item xl={2} sm={4} md={3} key={`bot-item-${item.assetid}`}>
            <ItemThumnail
              component={item}
              onClickHandler={() => this.props.selectBotItem(item)}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  renderPlayerItems = classes => {
    if (
      !this.props.player.auth &&
      !window.localStorage.getItem('tradewithme/user-id')
    ) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.fullSpace}
        >
          <Grid item>
            <Typography className={classes.steamNotloginText}>
              <FormattedMessage {...messages.notLogin} />
            </Typography>
            <Typography className={classes.steamNotloginText}>
              <FormattedMessage {...messages.login} />
            </Typography>
            <a href={Config.steamOpenIdUrl}>
              <img
                src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
                height={35}
                width="auto"
                alt="steam-authenticate-button"
              />
            </a>
          </Grid>
        </Grid>
      );
    }
    if (!this.props.player.loaded && this.props.player.loading) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.fullSpace}
        >
          <Grid item>
            <Spinner name="folding-cube" color="white" />
          </Grid>
        </Grid>
      );
    }
    if (this.props.player.loaded && this.props.player.error) {
      return (
        <Typography variant="h6" className={classes.subTitle}>
          <FormattedMessage {...messages.someThingWrong} />
        </Typography>
      );
    }
    return (
      <Grid container spacing={8}>
        {_.map(this.playerFilter(this.state.playerItems), item => (
          <Grid item xl={2} sm={4} md={3} key={`player-item-${item.assetid}`}>
            <ItemThumnail
              component={item}
              validate={this.validateItem(item)}
              onClickHandler={() => this.props.selectPlayerItem(item)}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  validateItem = item => {
    if (!item.tradable) {
      return {
        valide: false,
        state: 'Unavailable',
      };
    }
    if (item.overstock) {
      const itemCounts = _.countBy(
        this.props.trade.itemsOffer,
        i => i.market_hash_name,
      );
      const numberItem = itemCounts[item.market_hash_name] || 0;
      if (numberItem >= parseInt(item.overstock, 10)) {
        return {
          valid: false,
          state: 'Over Stock',
        };
      }
    }
    return {
      valid: true,
    };
  };

  onChangeBot = field => event => {
    let value = typeof event === 'object' ? event.target.value : event;
    if (!value) {
      value = field === 'minPrice' || field === 'maxPrice' ? 0 : '';
    }
    this.setState({
      botFilter: {
        ...this.state.botFilter,
        [field]: value,
      },
    });
  };

  onChangePlayer = field => event => {
    let value = typeof event === 'object' ? event.target.value : event;
    if (!value) {
      value = field === 'minPrice' || field === 'maxPrice' ? 0 : '';
    }
    this.setState({
      playerFilter: {
        ...this.state.playerFilter,
        [field]: value,
      },
    });
  };

  onChangeTradeUrl = e => {
    this.props.updateTradeUrl(e.target.value);
  };

  toggleMenuPlayer = event => {
    this.setState({
      showPlayerMenu: !this.state.showPlayerMenu,
      anchorEl: event ? event.currentTarget : null,
    });
  };

  isFilterInvalid = () => {
    if (this.state.botFilter.minPrice > this.state.botFilter.maxPrice) {
      return true;
    }
    return false;
  };

  getHelperText = (key, ...arg) => {
    switch (key) {
      case 'price':
        if (this.isFilterInvalid()) {
          return 'Max price cannot smaller than min price';
        }
        return arg[0] === 'min'
          ? 'Custom your minium price'
          : 'Custom your maxium price';
      case 'trade-url':
        return 'As Steam policy, we need your trade url to be able to send you this offer. You only need to provide it once since your first trade success';
      default:
        return '';
    }
  };

  botFilter = () => {
    let { botItems } = this.state;
    if (this.state.botFilter.minPrice <= this.state.botFilter.maxPrice) {
      botItems = _.filter(
        botItems,
        i =>
          i.price >= this.state.botFilter.minPrice &&
          i.price <= this.state.botFilter.maxPrice,
      );
    }
    const heroReg = new RegExp(this.state.botFilter.hero.toLowerCase(), 'i');
    const rarityReg = new RegExp(this.state.botFilter.rarity, 'i');
    const nameReg = new RegExp(this.state.botFilter.search, 'i');

    botItems = _.filter(
      botItems,
      item =>
        heroReg.test(getValueFromTag(item.tags, 'Hero').toLowerCase()) &&
        rarityReg.test(item.rarity.toLowerCase()) &&
        nameReg.test(item.market_hash_name.toLowerCase()),
    );

    switch (this.state.botFilter.order) {
      case 'price':
        botItems = _.sortBy(botItems, i => i.price);
        break;
      case 'name':
        botItems = _.sortBy(botItems, i => i.market_hash_name.toLowerCase());
        break;
      case 'hero':
        botItems = _.sortBy(botItems, i =>
          getValueFromTag(i.tags).toLowerCase(),
        );
        break;
      case 'rarity':
        botItems = _.sortBy(botItems, i => i.rarity.toLowerCase());
        break;
      default:
        break;
    }
    return botItems;
  };

  playerFilter = () => {
    let { playerItems } = this.state;
    const nameReg = new RegExp(this.state.playerFilter.search, 'i');

    playerItems = _.filter(playerItems, item =>
      nameReg.test(item.market_hash_name.toLowerCase()),
    );

    switch (this.state.playerFilter.order) {
      case 'price':
        playerItems = _.sortBy(playerItems, i => i.price);
        break;
      case 'name':
        playerItems = _.sortBy(playerItems, i =>
          i.market_hash_name.toLowerCase(),
        );
        break;
      case 'hero':
        playerItems = _.sortBy(playerItems, i =>
          getValueFromTag(i.tags).toLowerCase(),
        );
        break;
      case 'rarity':
        playerItems = _.sortBy(playerItems, i => i.rarity.toLowerCase());
        break;
      default:
        break;
    }
    return playerItems;
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
              <Typography
                variant="h6"
                color="inherit"
                className={classes.tradeWithMe}
              >
                <FormattedMessage {...messages.title} />
              </Typography>
              {this.props.player.auth ? (
                <div className="row-direction">
                  <Typography className={classes.username} variant="subheading">
                    {this.props.player.info.personaname}
                  </Typography>
                  <div className="margin-left-20">
                    <Avatar
                      alt="Player avatar"
                      src={this.props.player.info.avatar}
                      className={classes.bigAvatar}
                      onClick={this.toggleMenuPlayer}
                    />
                    <Menu
                      id="menu-appbar"
                      anchorEl={this.state.anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={this.state.showPlayerMenu}
                      onClose={this.toggleMenuPlayer}
                    >
                      <MenuItem onClick={this.props.logout}>
                        <FormattedMessage {...messages.logout} />
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              ) : (
                <a href={Config.steamOpenIdUrl}>
                  <img
                    src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
                    height={35}
                    width="auto"
                    alt="steam-authenticate-button"
                  />
                </a>
              )}
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
                          <FormattedMessage {...messages.youOffer} />
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="subtitle1"
                          className={`text-align-right ${classes.subTitle}`}
                        >
                          {_.round(
                            _.sumBy(this.props.trade.itemsOffer, i =>
                              _.round(i.price, 4),
                            ),
                            4,
                          )}{' '}
                          $
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="pad-10 select-area-body">
                    {this.renderSelectedItemPLayer(classes)}
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
                                <Button
                                  onClick={this.props.callSteamAuthenticate}
                                >
                                  <RefreshIcon className={classes.icon} />
                                </Button>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid item sm={5}>
                          <TextField
                            id="item-player-order-field"
                            label="Order"
                            className={classes.input}
                            value={this.state.playerFilter.order}
                            onChange={this.onChangePlayer('order')}
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
                            value={this.state.playerFilter.search}
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
                    <div className="pad-10 select-area-body" id="items-list">
                      {this.renderPlayerItems(classes)}
                    </div>
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
                    onClick={() => {
                      this.props.createNewOffer();
                    }}
                  >
                    <FormattedMessage {...messages.toTrade} />
                  </Button>
                </div>
                <div className="toolbar-filter">
                  <div className="pad-10 select-area-header">
                    <Typography
                      variant="subtitle1"
                      className={`text-align-center ${classes.subTitle}`}
                    >
                      <FormattedMessage {...messages.botFilter} />
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
                        <FormattedMessage {...messages.price} />
                      </Typography>
                      <Grid container spacing={8}>
                        <Grid item sm={6}>
                          <TextField
                            error={this.isFilterInvalid()}
                            className={classes.input}
                            id="item-filter-min-price"
                            label="Min"
                            value={this.state.botFilter.minPrice}
                            onChange={e =>
                              this.onChangeBot('minPrice')(
                                parseInt(e.target.value, 10),
                              )
                            }
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
                            FormHelperTextProps={{
                              classes: {
                                root: classes.helperTextDefault,
                                error: classes.helperTextError,
                              },
                            }}
                            margin="dense"
                            fullWidth
                            helperText={this.getHelperText('price', 'min')}
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextField
                            error={this.isFilterInvalid()}
                            className={classes.input}
                            id="item-filter-max-price"
                            label="Max"
                            value={this.state.botFilter.maxPrice}
                            onChange={e =>
                              this.onChangeBot('maxPrice')(
                                parseInt(e.target.value, 10),
                              )
                            }
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
                            FormHelperTextProps={{
                              classes: {
                                root: classes.helperTextDefault,
                                error: classes.helperTextError,
                              },
                            }}
                            margin="dense"
                            fullWidth
                            helperText={this.getHelperText('price', 'max')}
                          />
                        </Grid>
                      </Grid>
                      <br />
                      <Range
                        min={0}
                        max={9999}
                        defaultValue={[3, 9999]}
                        value={[
                          this.state.botFilter.minPrice,
                          this.state.botFilter.maxPrice,
                        ]}
                        onChange={arg => {
                          if (arg[0] !== this.state.botFilter.minPrice) {
                            this.onChangeBot('minPrice')(arg[0]);
                          }
                          if (arg[1] !== this.state.botFilter.maxPrice) {
                            this.onChangeBot('maxPrice')(arg[1]);
                          }
                        }}
                        tipFormatter={value => `${value}$`}
                      />
                    </div>
                    <div id="hero-filter">
                      <TextField
                        className={classes.input}
                        id="item-filter-hero"
                        label="Hero"
                        value={this.state.botFilter.hero}
                        onChange={this.onChangeBot('hero')}
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
                        value={this.state.botFilter.rarity}
                        onChange={this.onChangeBot('rarity')}
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
                          {_.round(
                            _.sumBy(this.props.trade.itemsReceive, i =>
                              _.round(i.price, 4),
                            ),
                            4,
                          )}{' '}
                          $
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="subtitle1"
                          className={`text-align-right ${classes.subTitle}`}
                        >
                          <FormattedMessage {...messages.youReceive} />
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
                                <Button onClick={this.props.getBotItems}>
                                  <RefreshIcon className={classes.icon} />
                                </Button>
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
                            value={this.state.botFilter.sort}
                            onChange={this.onChangeBot('sort')}
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
                            value={this.state.botFilter.search}
                            onChange={this.onChangeBot('search')}
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
                    <div className="pad-10 select-area-body" id="items-list">
                      {this.renderBotItems(classes)}
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <AppBar position="static" className={`pad-10 ${classes.appBar}`}>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <FormattedMessage {...messages.title} />
          </Typography>
        </AppBar>
        <Modal
          open={this.props.trade.showTradeUrlInputModal}
          onClose={this.props.toggleTradeUrlInputModal}
        >
          <Grid className={classes.modal}>
            <Grid>
              <Typography variant="h6" className={classes.h6}>
                <FormattedMessage {...messages.tradeUrlModalTitle} />
              </Typography>
              <TextField
                fullWidth
                className={classes.input}
                id="player-trade-url-input"
                label={<FormattedMessage {...messages.tradeUrl} />}
                value={this.props.trade.urlTrade}
                onChange={this.onChangeTradeUrl}
                placeholder="Something like 'https://steamcommunity.com/tradeoffer/new/?partner=000001&token=any_toke'"
                margin="dense"
                helperText={this.getHelperText('trade-url')}
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
                FormHelperTextProps={{
                  classes: {
                    root: classes.helperTextDefault,
                    error: classes.helperTextError,
                  },
                }}
              />
              <br />
              <br />
              <Grid container spacing={16}>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.tradeButton}
                    onClick={() => {
                      this.props.createNewOffer();
                      this.toggleTradeUrlInputModal();
                    }}
                  >
                    <FormattedMessage {...messages.submit} />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.getUrlButton}
                  >
                    <a
                      href={`${
                        this.props.player.info.profileurl
                      }/tradeoffers/privacy`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.urlButton}
                    >
                      <FormattedMessage {...messages.getTradeUrl} />
                    </a>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
        <Modal open={this.props.trade.loading}>
          <Spinner className="center" name="folding-cube" color="white" />
        </Modal>
        <Modal open={this.props.trade.showResultModal}>
          <div className={classes.modal}>
            {this.props.trade.error && (
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="h6" className={classes.h6}>
                    <FormattedMessage {...messages.createOfferFail} />
                  </Typography>
                  <br />
                  <Grid container justify="center">
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.getUrlButton}
                        onClick={this.props.toggleResultModal}
                      >
                        <FormattedMessage {...messages.close} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {!this.props.trade.error && (
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="h6" className={classes.h6}>
                    <FormattedMessage {...messages.createOfferSuccess} />
                  </Typography>
                  <br />
                  <Grid container spacing={16} justify="center">
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.getUrlButton}
                      >
                        <a
                          href={`${
                            this.props.player.info.profileurl
                          }/tradeoffers?history=1`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={classes.urlButton}
                        >
                          <FormattedMessage {...messages.showMyOffer} />
                        </a>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="danger"
                        className={classes.getUrlButton}
                        onClick={this.props.toggleResultModal}
                      >
                        <FormattedMessage {...messages.close} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

Home.propTypes = {
  getBotItems: PropTypes.func.isRequired,
  callSteamAuthenticate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  bot: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  trade: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  selectPlayerItem: PropTypes.func.isRequired,
  selectBotItem: PropTypes.func.isRequired,
  removeBotItem: PropTypes.func.isRequired,
  removePlayerItem: PropTypes.func.isRequired,
  updateTradeUrl: PropTypes.func.isRequired,
  toggleTradeUrlInputModal: PropTypes.func.isRequired,
  toggleResultModal: PropTypes.func.isRequired,
  createNewOffer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bot: selectBot(),
  player: selectUser(),
  trade: selectTrade(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBotItems: () => dispatch(getBotItems()),
    callSteamAuthenticate: () => dispatch(callSteamAuthenticate()),
    logout: () => dispatch(logout()),
    toggleTradeUrlInputModal: () => dispatch(toggleTradeUrlInputModal()),
    toggleResultModal: () => dispatch(toggleResultModal()),
    createNewOffer: () => dispatch(createNewOffer()),
    selectPlayerItem: item => dispatch(selectPlayerItem(item)),
    selectBotItem: item => dispatch(selectBotItem(item)),
    removeBotItem: item => dispatch(removeBotItem(item)),
    removePlayerItem: item => dispatch(removePlayerItem(item)),
    updateTradeUrl: url => dispatch(updateTradeUrl(url)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(
  withReducer,
  withConnect,
  withStyles(styles),
)(Home);
