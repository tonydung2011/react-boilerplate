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
      // sorted: [],
      // page: 0,
      // pageSize: 10,
      // expanded: {},
      // resized: [],
      // filtered: [],
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
    /*
      'toggleAll' is a tricky concept with any filterable table
      do you just select ALL the records that are in your data?
      OR
      do you only select ALL the records that are in the current filtered data?
      
      The latter makes more sense because 'selection' is a visual thing for the user.
      This is especially true if you are going to implement a set of external functions
      that act on the selected information (you would not want to DELETE the wrong thing!).
      
      So, to that end, access to the internals of ReactTable are required to get what is
      currently visible in the table (either on the current page or any other page).
      
      The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
      ReactTable and then get the internal state and the 'sortedData'. 
      That can then be iterrated to get all the currently visible records and set
      the selection state.
    */
    const selectAll = !this.state.selectAll;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
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
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
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
          // {
          //   Header: 'Icon',
          //   accessor: 'image',
          //   Cell: props => (
          //     <a href={props.value}>
          //       <PhotoIcon />
          //     </a>
          //   ),
          // },
          {
            Header: 'Market Rate',
            accessor: 'marketRate',
          },
          {
            Header: 'Tradable',
            accessor: 'tradable',
            Cell: props => <p>{props.value ? 'yes' : 'no'}</p>,
          },
        ]}
        manual
        defaultPageSize={10}
        // page={this.props.page - 1}
        pages={
          this.props.total / this.props.limit +
          (this.props.total % this.props.limit > 0 ? 1 : 0)
        }
        loading={this.props.loading}
        onFetchData={this.fetchData}
        onPageChange={page => this.props.updatePage(page + 1)}
        onPageSizeChange={pageSize => {
          this.props.updateLimit(pageSize);
        }}
        // Controlled props
        // sorted={this.state.sorted}
        // page={this.state.page}
        // pageSize={this.state.pageSize}
        // expanded={this.state.expanded}
        // resized={this.state.resized}
        // filtered={this.state.filtered}
        // Callbacks
        // onSortedChange={sorted => this.setState({ sorted })}
        // onExpandedChange={expanded => this.setState({ expanded })}
        // onResizedChange={resized => this.setState({ resized })}
        // onFilteredChange={filtered => this.setState({ filtered })}
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
