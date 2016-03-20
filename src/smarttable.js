import React from 'react';
import ReactDOM from 'react-dom';


export default class SmartTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currentSortOrder: {},
      orderBy: null,
    };
  }
  componentWillMount() {
    let startSortOrder = {};
    for (let column of this.props.columns) {
      startSortOrder[column.key] = column.key === this.props.orderBy ? 'desc' : 'asc';
    }
    this.setState({
      orderBy: this.props.orderBy,
      currentSortOrder: startSortOrder,
    });
    window.fetch(this.props.url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({data: data});
      }).catch(err => {
        console.error(err);
      });
  }
  toggleSortOrder(key) {
    const sortOrder = this.state.currentSortOrder;
    for (let k in sortOrder) {
      if (k === key) {
        sortOrder[k] = sortOrder[k] === 'asc' ? 'desc' : 'asc';
      } else {
        sortOrder[k] = 'asc';
      }
    }
    this.setState({currentSortOrder: sortOrder});
  }
  handleOrderChange(event) {
    const key = event.currentTarget.dataset.key;
    this.toggleSortOrder(key);
    this.setState({orderBy: key});
  }
  getSortFunction(key) {
    switch (key) {
      case 'id':
      case 'watched':
      case 'total':
      case 'score':
        if (this.state.currentSortOrder[key] === 'asc') {
          return (a, b) => { return b[key]-a[key]; };
        } else {
          return (a, b) => { return a[key]-b[key]; };
        }
      break;
      case 'status':
      case 'category':
      case 'title':
      case 'series':
      case 'start':
      default:
        if (this.state.currentSortOrder[key] === 'asc') {
          return (a, b) => { return a[key] === b[key] ? 0 : a[key] > b[key] ? -1 : 1; };
        } else {
          return (a, b) => { return a[key] === b[key] ? 0 : b[key] > a[key] ? -1 : 1; };
        }
        break;
    }
  }
  showToolTip(event) {
    const tooltip = ReactDOM.findDOMNode(this.refs.tooltip);
    tooltip.style.display = 'block';
    tooltip.style.left = (event.pageX - 20) + 'px';
    tooltip.style.top = (event.pageY - 20) + 'px';
    ReactDOM.render(<p>{event.currentTarget.title}</p>, tooltip);
  }
  hideToolTip(event) {
    const tooltip = ReactDOM.findDOMNode(this.refs.tooltip);
    if (event.relatedTarget && !tooltip.contains(event.relatedTarget)) {
      tooltip.style.display = 'none';
    }
  }
  render() {
    const data = this.state.data;
    data.sort(this.getSortFunction(this.state.orderBy));

    return (
      <section>
        <Table columns={this.props.columns} data={data} onToolTip={this.showToolTip.bind(this)} sortOrder={this.state.currentSortOrder} handleOrderChange={this.handleOrderChange.bind(this)} />
        <ToolTip ref="tooltip" onMouseLeave={this.hideToolTip.bind(this)} />
      </section>
    );
  }
}

class Table extends React.Component {
  render() {
    return (
      <table>
        <TableHead columns={this.props.columns} sortOrder={this.props.sortOrder} handleOrderChange={this.props.handleOrderChange} />
        <TableBody columns={this.props.columns} data={this.props.data} onToolTip={this.props.onToolTip} />
      </table>
    );
  }
}

class TableHead extends React.Component {
  render() {
    const th = this.props.columns.map(col => {
      return (
        <th onClick={this.props.handleOrderChange} data-key={col.key} key={col.key}>
          {col.name}<span className={[col.type, this.props.sortOrder[col.key]].join(' ')} aria-hidden="true"></span>
        </th>
      );
    });
    return (
      <thead>
        <tr>
          {th}
        </tr>
      </thead>
    );
  }
}

class TableBody extends React.Component {
  render() {
    const rows = this.props.data.map((row, index) => {
      const td = this.props.columns.map(col => {
        if (col.print) {
          return <td key={col.key}>{col.print(row, this)}</td>;
        } else {
          return <td key={col.key}>{row[col.key]}</td>;
        }
      });
      return (
        <tr key={row.id}>
          {td}
        </tr>
      );
    });
    return (
      <tbody>
        {rows}
      </tbody>
    );
  }
}

class ToolTip extends React.Component {
  render() {
    return <div className="ani_tooltip" onMouseLeave={this.props.onMouseLeave} />;
  }
}
