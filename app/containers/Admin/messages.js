/*
 * Admin Messages
 *
 * This contains all the text for the Admin container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Admin';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'ALL DOTA2 TRADE ITEMS',
  },
  reload: {
    id: `${scope}.reload`,
    defaultMessage: 'reload',
  },
});
