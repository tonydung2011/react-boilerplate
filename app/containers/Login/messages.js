/*
 * Login Messages
 *
 * This contains all the text for the Login container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Login';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Login container!',
  },
  authenticatedRequired: {
    id: `${scope}.authenticatedRequired`,
    defaultMessage: 'Protected Resource',
  },
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Submit',
  },
  clearSession: {
    id: `${scope}.clearSession`,
    defaultMessage: 'Clear Session',
  },
});
