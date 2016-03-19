import React from 'react';
import ReactDOM from 'react-dom';

import SmartTable from 'smarttable';

import 'style.scss';

ReactDOM.render(<SmartTable orderBy="id" />, document.querySelector('body'));
