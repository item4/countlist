import React from 'react';
import ReactDOM from 'react-dom';


export class CountList extends React.Component {
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
        return (
            <main>
                <h1>내가 본 애니 목록</h1>
                <Summary data={this.props.data} />
                <Table data={this.props.data} onToolTip={this.showToolTip.bind(this)} sort={this.props.sort} />
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
        return (
            <table>
                <thead>
                    <tr>
                        <th onClick={this.props.sort('id')}>번호</th>
                        <th onClick={this.props.sort('status')}>현황</th>
                        <th onClick={this.props.sort('category')}>유형</th>
                        <th onClick={this.props.sort('title')}>제목</th>
                        <th onClick={this.props.sort('series')}>시리즈</th>
                        <th onClick={this.props.sort('start')}>방영 시작</th>
                        <th onClick={this.props.sort('watched')}>감상 편수</th>
                        <th onClick={this.props.sort('total')}>전체 편수</th>
                        <th onClick={this.props.sort('score')}>점수</th>
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
            if (ani.class === 'r19') {
                r19 = <span className="r19" title="이 애니는 19금입니다!"></span>;
            }

            let info_icon = null;
            if (ani.comment) {
                info_icon = <span className="info" title={ani.comment} onMouseEnter={this.props.onToolTip}></span>;
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
