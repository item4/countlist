import React from 'react';
import ReactDOM from 'react-dom';


export class CountList extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            sortOrder: {
                'id': 'desc',
                'watched': 'asc',
                'total': 'asc',
                'score': 'asc',
                'status': 'asc',
                'category': 'asc',
                'title': 'asc',
                'series': 'asc',
                'start': 'asc'
            },
            orderBy: 'id'
        };
    }
    componentWillMount() {
        fetch('data.json')
            .then(function(response){
                return response.json();
            })
            .then(function(data){

                this.setState({data: data});
            }.bind(this)).catch(function(ex){
                console.log(ex);
            });
    }
    toggleSortOrder(key) {
        let sortOrder = this.state.sortOrder;
        for (let k in sortOrder) {
            if (k === key) {
                sortOrder[k] = sortOrder[k] === 'asc' ? 'desc' : 'asc';
            } else {
                sortOrder[k] = 'asc';
            }
        }
        this.setState({sortOrder: sortOrder});
    }
    handleOrderChange(event) {
        let key = event.currentTarget.dataset.key;
        this.toggleSortOrder(key);
        this.setState({orderBy: key});
    }
    getSort(key) {
        switch (key) {
            case 'id':
            case 'watched':
            case 'total':
            case 'score':
                if (this.state.sortOrder[key] === 'asc') {
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
                if (this.state.sortOrder[key] === 'asc') {
                    return (a, b) => { return a[key] === b[key] ? 0 : a[key] > b[key] ? -1 : 1; };
                } else {
                    return (a, b) => { return a[key] === b[key] ? 0 : b[key] > a[key] ? -1 : 1; };
                }
                break;
        }
    }
    showToolTip(event) {
        let tooltip = ReactDOM.findDOMNode(this.refs.tooltip);
        tooltip.style.display = 'block';
        tooltip.style.left = (event.pageX - 20) + 'px';
        tooltip.style.top = (event.pageY - 20) + 'px';
        ReactDOM.render(<p>{event.currentTarget.title}</p>, tooltip);
    }
    hideToolTip(event) {
        let tooltip = ReactDOM.findDOMNode(this.refs.tooltip);
        if (event.relatedTarget && !tooltip.contains(event.relatedTarget)) {
            tooltip.style.display = 'none';
        }
    }
    render() {
        let data = this.state.data;
        data.sort(this.getSort(this.state.orderBy));

        return (
            <main>
                <h1>내가 본 애니 목록</h1>
                <Summary data={data} />
                <Table data={data} onToolTip={this.showToolTip.bind(this)} sortOrder={this.state.sortOrder} handleOrderChange={this.handleOrderChange.bind(this)} />
                <ToolTip ref="tooltip" onMouseLeave={this.hideToolTip.bind(this)} />
            </main>
        );
    }
}

class Summary extends React.Component {
    render() {
        return (
            <p>총 {this.props.data.length}편 보았습니다.</p>
        );
    }
}

class Table extends React.Component {
    render() {
        let cols = [
            {key: 'id', name: '번호', type: 'num'},
            {key: 'status', name: '현황', type: 'string'},
            {key: 'category', name: '유형', type: 'string'},
            {key: 'title', name: '제목', type: 'string'},
            {key: 'series', name: '시리즈', type: 'string'},
            {key: 'start', name: '방영 시작', type: 'string'},
            {key: 'watched', name: '감상 편수', type: 'num'},
            {key: 'total', name: '전체 편수', type: 'num'},
            {key: 'score', name: '점수', type: 'num'},
        ];
        let rendered_cols = cols.map((col) => {
            return <th onClick={this.props.handleOrderChange} data-key={col.key}>{col.name}<span className={col.type + ' ' + this.props.sortOrder[col.key]} aria-hidden="true"></span></th>
        });
        return (
            <table>
                <thead>
                    <tr>
                        {rendered_cols}
                    </tr>
                </thead>
                <Rows data={this.props.data} onToolTip={this.props.onToolTip} />
            </table>
        );
    }
}

class Rows extends React.Component {
    render() {
        let rows = this.props.data.map((ani, index) => {
            let r19 = null;
            if (ani.r19) {
                r19 = <span className="r19" title="이 애니는 19금입니다!" aria-hidden="true"></span>;
            }

            let info_icon = null;
            if (ani.comment) {
                info_icon = <span className="info" title={ani.comment} onMouseEnter={this.props.onToolTip} aria-hidden="true"></span>;
            }
            return (
                <tr key={ani.id}>
                    <td>{ani.id+1}</td>
                    <td>{ani.status}</td>
                    <td>{ani.category}</td>
                    <td>{r19}{ani.title}{info_icon}</td>
                    <td>{ani.series}</td>
                    <td>{ani.start}</td>
                    <td>{ani.watched}</td>
                    <td>{ani.total}</td>
                    <td>{ani.score}</td>
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
