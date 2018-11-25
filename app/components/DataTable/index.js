/**
 *
 * DataTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import _ from 'lodash';
const CheckboxTable = checkboxHOC(ReactTable);

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: [],
      selectAll: false,
    };
  }

  componentDidMount = () => {
    this.props.onMount(this);
    this.props.onFetchData();
  };

  toggleSelection = (key, shift, row) => {
    const keyIndex = _.findIndex(
      this.state.selection,
      i => i.market_hash_name === key,
    );
    if (keyIndex !== -1) {
      this.setState({
        selection: _.filter(
          this.state.selection,
          i => i.market_hash_name !== key,
        ),
      });
    } else {
      this.setState({
        selection: [
          ...this.state.selection,
          {
            market_hash_name: key,
            tradable: row.tradable,
          },
        ],
      });
    }
  };

  toggleAll = () => {
    const selectAll = !this.state.selectAll;
    const selection = [];
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      currentRecords.forEach(item => {
        selection.push({
          market_hash_name: item._original.market_hash_name, /*eslint-disable-line*/
          tradable: item.tradable,
        });
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key =>
    _.findIndex(this.state.selection, i => i.market_hash_name === key) !== -1;

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { selectAll } = this.state;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: 'checkbox',
      keyField: 'market_hash_name',
      getTrProps: (s, r) => {
        if (r) {
          const selected = this.isSelected(r.original.market_hash_name);
          return {
            style: {
              backgroundColor: selected ? 'lightgreen' : 'inherit',
            },
          };
        }
        return {
          style: {
            backgroundColor: 'inherit',
          },
        };
      },
    };
    return (
      <CheckboxTable
        ref={r => {
          this.checkboxTable = r;
        }}
        data={this.props.data}
        columns={[
          {
            Header: 'Market Hash Name',
            accessor: 'market_hash_name',
            sortable: false,
          },
          {
            Header: 'Used by Hero',
            accessor: 'hero',
            sortable: false,
          },
          {
            Header: 'Rarity',
            accessor: 'rarity',
            sortable: false,
          },
          {
            Header: 'Prices',
            accessor: d => d.prices.safe_ts.last_24h,
            id: 'prices-latest',
            sortable: false,
          },
          {
            Header: 'Icon',
            accessor: 'image',
            sortable: false,
            Cell: props => (
              <img src={props.value} width={50} height={50} alt="icon" />
            ),
          },
          {
            Header: 'Market Rate',
            accessor: 'marketRate',
            sortable: false,
          },
          {
            Header: 'Overstock',
            accessor: 'overstock',
            sortable: false,
          },
          {
            Header: 'Tradable',
            accessor: 'tradable',
            sortable: false,
            Cell: props => <p>{props.value ? 'yes' : 'no'}</p>,
          },
        ]}
        manual
        defaultPageSize={10}
        page={this.props.page - 1}
        pages={
          this.props.total / this.props.limit +
          (this.props.total % this.props.limit > 0 ? 1 : 0)
        }
        pageSize={this.props.limit}
        loading={this.props.loading}
        onFetchData={this.fetchData}
        onPageChange={page => this.props.updatePage(page + 1)}
        onPageSizeChange={pageSize => {
          this.props.updateLimit(pageSize);
        }}
        {...checkboxProps}
      />
    );
  }
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  pages: PropTypes.number,
  page: PropTypes.number,
  limit: PropTypes.number,
  total: PropTypes.number,
  onFetchData: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired,
  updateLimit: PropTypes.func.isRequired,
  onMount: PropTypes.func,
};

DataTable.defaultProps = {
  pages: 1,
};

export default DataTable;
