import React from 'react';


export class CountList extends React.Component {
    render() {
        return (
            <main>
                <h1>내가 본 애니 목록</h1>
                <Summary data={this.props.data} />
                <Table data={this.props.data} />
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
                        <th>번호</th>
                        <th>현황</th>
                        <th>유형</th>
                        <th>제목</th>
                        <th>시리즈</th>
                        <th>방영 시작</th>
                        <th>감상 편수</th>
                        <th>전체 편수</th>
                        <th>점수</th>
                    </tr>
                </thead>
                <Rows data={this.props.data} />
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
                info_icon = <span className="info" title={ani.comment}></span>;
            }
            return (
                <tr key={ani.id}>
                    <td>{index+1}</td>
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
