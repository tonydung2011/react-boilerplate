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
});
