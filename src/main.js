import React from 'react';
import ReactDOM from 'react-dom';

import SmartTable from 'smarttable';
import styles from './main.scss';


const orderBy = 'id';
const url = './data.json';
const columns = [
  {key: 'id', name: '번호', type: 'num', print: data => { return data.id+1; }},
  {key: 'status', name: '현황', type: 'string'},
  {key: 'category', name: '유형', type: 'string'},
  {
    key: 'title',
    name: '제목',
    type: 'string',
    print: (data, rows) => {
      let r19 = null;
      let info_icon = null;

      if (data.r19) {
        r19 = <span className={styles.icon__r19} title="이 애니는 19금입니다!" aria-hidden="true"></span>;
      }
      if (data.comment) {
        info_icon = <span className={styles.icon__info} title={data.comment} onMouseEnter={rows.props.onToolTip} aria-hidden="true"></span>;
      }
      return <span>{r19}{data.title}{info_icon}</span>;
    }
  },
  {key: 'series', name: '시리즈', type: 'string'},
  {key: 'start', name: '방영 시작', type: 'string'},
  {key: 'watched', name: '감상 편수', type: 'num'},
  {key: 'total', name: '전체 편수', type: 'num'},
  {key: 'score', name: '점수', type: 'num'},
];

ReactDOM.render(<SmartTable columns={columns} orderBy={orderBy} url={url} />, document.querySelector('main'));
