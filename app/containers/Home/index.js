/**
 *
 * Home
 *
 */

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import Snackbar from '@material-ui/core/Snackbar';
import ItemThumnail from 'components/ItemThumnail';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Config from 'utils/config';
import injectReducer from 'utils/injectReducer';
import { getValueFromTag } from 'utils/utils';
import {
  callSteamAuthenticate,
  createNewOffer,
  getBotItems,
  logout,
  removeBotItem,
  removePlayerItem,
  selectBotItem,
  selectPlayerItem,
  toggleResultModal,
  toggleTradeUrlInputModal,
  updateTradeUrl,
  hideSnackbar,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import { selectBot, selectTrade, selectUser } from './selectors';
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
            action: 'ĐỀ NGHỊ',
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
            className={classes.itemThumbnail}
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
            action: 'NHẬN',
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
            className={classes.itemThumbnail}
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
          <Grid
            item
            xl={2}
            sm={4}
            md={3}
            key={`bot-item-${item.assetid}`}
            className={classes.itemThumbnail}
          >
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
          <Grid
            item
            xl={2}
            sm={4}
            md={3}
            key={`player-item-${item.assetid}`}
            className={classes.itemThumbnail}
          >
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
    if (
      (typeof item.marketMarketableRestriction === 'boolean' &&
        item.marketMarketableRestriction) ||
      (typeof item.marketMarketableRestriction === 'number' &&
        item.marketMarketableRestriction > 0)
    ) {
      return {
        valide: false,
        state: 'Unavailable',
      };
    }
    if (item.overstock) {
      const itemCounts = _.countBy(
        this.props.trade.itemsOffer,
        i => i.marketHashName,
      );
      const numberItem = itemCounts[item.marketHashName] || 0;
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
          return 'Giá lớn nhất không thể nhỏ hơn giá nhỏ nhất';
        }
        return arg[0] === 'min'
          ? 'Điều chỉnh giá nhỏ nhất'
          : 'Điều chỉnh giá lớn nhất';
      case 'trade-url':
        return 'Theo quy định của Steam, bạn cần phải cung cấp Link trao đổi (Trade URL) để chúng tôi có thể gửi giao dịch này cho bạn. Bạn chỉ cần cung cấp 1 lần sau giao dịch thành công đầu tiên';
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
        nameReg.test(item.marketHashName.toLowerCase()),
    );

    switch (this.state.botFilter.order) {
      case 'price':
        botItems = _.sortBy(botItems, i => i.price);
        break;
      case 'name':
        botItems = _.sortBy(botItems, i => i.marketHashName.toLowerCase());
        break;
      case 'hero':
        botItems = _.sortBy(botItems, i =>
          getValueFromTag(i.tags, 'Hero').toLowerCase(),
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
      nameReg.test(item.marketHashName.toLowerCase()),
    );

    switch (this.state.playerFilter.order) {
      case 'price':
        playerItems = _.sortBy(playerItems, i => i.price);
        break;
      case 'name':
        playerItems = _.sortBy(playerItems, i =>
          i.marketHashName.toLowerCase(),
        );
        break;
      case 'hero':
        playerItems = _.sortBy(playerItems, i =>
          getValueFromTag(i.tags, 'Hero').toLowerCase(),
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

  verifyOffer = () => {
    if (
      !this.props.trade.isPending &&
      !_.isEmpty(this.props.trade.itemsOffer) &&
      !_.isEmpty(this.props.trade.itemsReceive) &&
      _.sumBy(this.props.trade.itemsOffer, i => i.price) >=
        _.sumBy(this.props.trade.itemsReceive, i => i.price)
    ) {
      return true;
    }
    return false;
  };

  getSnackbarVariant = () => {
    switch (this.props.trade.snackbar.color) {
      case 'success':
        return this.props.classes.snackbarSuccess;
      case 'fail':
        return this.props.classes.snackbarError;
      default:
        return this.props.classes.snackbarInfo;
    }
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
                      {this.props.trade.isPending && (
                        <MenuItem>
                          <FormattedMessage {...messages.pendingOffer} />
                        </MenuItem>
                      )}
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
            <div className="notice-board">
              <div className="notice-board-writable" />
            </div>
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
                            label="Sắp xếp theo"
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
                            <option value="price">Giá</option>
                            <option value="name">Tên</option>
                            <option value="hero">nhân vật</option>
                            <option value="rarity">Độ Quý</option>
                          </TextField>
                        </Grid>
                        <Grid item sm={5}>
                          <TextField
                            className={classes.input}
                            id="item-player-search-field"
                            label="Tìm Kiếm"
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
                    disabled={!this.verifyOffer()}
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
                        label="Nhân vật"
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
                <div className="margin-y-10 pad-10 marketrate-container">
                  <div className="text-align-center margin-y-10">
                    <Typography variant="title" className={classes.colorC9D5B5}>
                      <FormattedMessage {...messages.marketRate} />
                    </Typography>
                  </div>
                  <div
                    className={`text-align-center margin-y-10 ${
                      classes.colorD7816A
                    }`}
                  >
                    <Typography variant="subtitle1">
                      <FormattedMessage {...messages.marketRate85} />
                    </Typography>
                  </div>
                  <div
                    className={`text-align-center margin-y-10 ${
                      classes.color77BA99
                    }`}
                  >
                    <Typography variant="subtitle1">
                      <FormattedMessage {...messages.marketRate90} />
                    </Typography>
                  </div>
                  <div
                    className={`text-align-center margin-y-10 ${
                      classes.color84ACCE
                    }`}
                  >
                    <Typography variant="subtitle1">
                      <FormattedMessage {...messages.marketRate95} />
                    </Typography>
                  </div>
                  <div
                    className={`text-align-center margin-y-10 ${
                      classes.colorD33F49
                    }`}
                  >
                    <Typography variant="subtitle1">
                      <FormattedMessage
                        {...messages.marketRate100}
                        className="color-C9D5B5"
                      />
                    </Typography>
                  </div>
                  <div
                    className={`text-align-center margin-y-10 ${
                      classes.colorA5668B
                    }`}
                  >
                    <Typography variant="subtitle1">
                      <FormattedMessage
                        {...messages.marketRate105}
                        className="color-C9D5B5"
                      />
                    </Typography>
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
                            label="Sắp xếp theo"
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
                            <option value="price">Giá</option>
                            <option value="name">Tên</option>
                            <option value="hero">Nhân Vật</option>
                            <option value="rarity">Độ Quý</option>
                          </TextField>
                        </Grid>
                        <Grid item sm={5}>
                          <TextField
                            className={classes.input}
                            id="item-player-search-field"
                            label="Tìm Kiếm"
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
                      this.props.toggleTradeUrlInputModal();
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
                          }/tradeoffers/`}
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
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.props.trade.snackbar.isDisplay}
          autoHideDuration={5000}
          onClose={this.props.hideSnackbar}
          ContentProps={{
            className: this.getSnackbarVariant(),
          }}
          message={this.props.trade.snackbar.message}
        />
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
  toggleSnackbar: PropTypes.func.isRequired,
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
    hideSnackbar: () => dispatch(hideSnackbar()),
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
