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
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  authenticatedRequired: {
    id: `${scope}.authenticatedRequired`,
    defaultMessage: 'Protected Resource',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Submit',
  },
  clearSession: {
    id: `${scope}.clearSession`,
    defaultMessage: 'Clear Session',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  updateDotaItemTitle: {
    id: `${scope}.updateDotaItemTitle`,
    defaultMessage: 'Update Dota Items',
  },
});
