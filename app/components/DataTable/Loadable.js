/**
 *
 * Asynchronously loads the component for DataTable
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
