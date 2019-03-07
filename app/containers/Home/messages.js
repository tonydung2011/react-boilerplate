/*
 * Home Messages
 *
 * This contains all the text for the Home container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Home';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'TRADE WITH ME',
  },
  title: {
    id: `${scope}.title`,
    defaultMessage: 'TRADE WITH ME',
  },
  selectedItems: {
    id: `${scope}.selectedItems`,
    defaultMessage:
      'SELECT THE ITEMS YOU WANT TO {action} FROM THE INVENTORY BOX BELOW',
  },
  someThingWrong: {
    id: `${scope}.someThingWrong`,
    defaultMessage: 'Some Thing went wrong',
  },
  notLogin: {
    id: `${scope}.header`,
    defaultMessage: 'YOU DID NOT LOGIN',
  },
  login: {
    id: `${scope}.header`,
    defaultMessage: 'LOGIN VIA STEAM',
  },
  price: {
    id: `${scope}.price`,
    defaultMessage: 'Prices',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  hero: {
    id: `${scope}.hero`,
    defaultMessage: 'Hero',
  },
  rarity: {
    id: `${scope}.rarity`,
    defaultMessage: 'Rarity',
  },
  toTrade: {
    id: `${scope}.toTrade`,
    defaultMessage: 'Trade',
  },
  botFilter: {
    id: `${scope}.botFilter`,
    defaultMessage: 'Bot Filter',
  },
  all: {
    id: `${scope}.all`,
    defaultMessage: 'All',
  },
  common: {
    id: `${scope}.common`,
    defaultMessage: 'Common',
  },
  Uncommon: {
    id: `${scope}.Uncommon`,
    defaultMessage: 'uncommon',
  },
  rare: {
    id: `${scope}.rare`,
    defaultMessage: 'Rare',
  },
  immortal: {
    id: `${scope}.immortal`,
    defaultMessage: 'Immortal',
  },
  mythical: {
    id: `${scope}.mythical`,
    defaultMessage: 'Mythical',
  },
  legendary: {
    id: `${scope}.legendary`,
    defaultMessage: 'Legendary',
  },
  arcana: {
    id: `${scope}.arcana`,
    defaultMessage: 'Arcana',
  },
  youReceive: {
    id: `${scope}.youReceive`,
    defaultMessage: 'You Receive',
  },
  youOffer: {
    id: `${scope}.youOffer`,
    defaultMessage: 'You Offer',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Log out',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'submit',
  },
  tradeUrl: {
    id: `${scope}.tradeUrl`,
    defaultMessage: 'Trade Url',
  },
  tradeUrlModalTitle: {
    id: `${scope}.tradeUrlModalTitle`,
    defaultMessage: 'SUBMIT YOUR TRADE URL',
  },
  getTradeUrl: {
    id: `${scope}.getTradeUrl`,
    defaultMessage: 'GET MY TRADE URL',
  },
  createOfferFail: {
    id: `${scope}.createOfferFail`,
    defaultMessage: 'CANNOT CREATE THE PREVIOUS OFFER',
  },
  createOfferSuccess: {
    id: `${scope}.createOfferSuccess`,
    defaultMessage: 'OFFER CREATED SUCCESSFULLY',
  },
  showMyOffer: {
    id: `${scope}.showMyOffer`,
    defaultMessage: 'Show Offer',
  },
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Close',
  },
  marketRate: {
    id: `${scope}.marketRate`,
    defaultMessage: 'Market Rate',
  },
  marketRate85: {
    id: `${scope}.marketRate85`,
    defaultMessage: '80% - 85%',
  },
  marketRate90: {
    id: `${scope}.marketRate90`,
    defaultMessage: '85% - 90%',
  },
  marketRate95: {
    id: `${scope}.marketRate95`,
    defaultMessage: '90% - 95%',
  },
  marketRate100: {
    id: `${scope}.marketRate100`,
    defaultMessage: '95% - 100%',
  },
  marketRate105: {
    id: `${scope}.marketRate105`,
    defaultMessage: '100% - 105%',
  },
  pendingOffer: {
    id: `${scope}.pendingOffer`,
    defaultMessage: 'You have a pending offer being processed, please wait',
  },
  lastOfferStatus: {
    id: `${scope}.lastOfferStatus`,
    defaultMessage: 'Your last offer status: ',
  },
  offerProcessing: {
    id: `${scope}.offerProcessing`,
    defaultMessage: 'Your offer is processing, please wait!',
  },
});
