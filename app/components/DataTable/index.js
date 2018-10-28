/**
 *
 * DataTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import PhotoIcon from '@material-ui/icons/InsertPhoto';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class DataTable extends React.Component {
  render() {
    return (
      <ReactTable
        data={this.props.data}
        columns={[
          {
            Header: 'Market Hash Name',
            accessor: 'market_hash_name',
          },
          {
            Header: 'Used by Hero',
            accessor: 'hero',
          },
          {
            Header: 'Rarity',
            accessor: 'rarity',
          },
          {
            Header: 'Prices',
            accessor: d => d.prices.latest,
            id: 'prices-latest',
          },
          {
            Header: 'Icon',
            accessor: 'image',
            Cell: props => (
              <a href={props.value}>
                <PhotoIcon />
              </a>
            ),
          },
          {
            Header: 'Market Rate',
            accessor: 'marketRate',
          },
          {
            Header: 'Tradable',
            accessor: 'tradable',
            Cell: props => <input type="checkbox" checked={props.value} />,
          },
        ]}
      />
    );
  }
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DataTable;
