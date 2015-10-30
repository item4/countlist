import React from 'react';
import ReactDOM from 'react-dom';

import {CountList} from 'countlist';

import 'style.scss';

ReactDOM.render(<CountList orderBy="id" />, document.querySelector('body'));
