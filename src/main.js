import ReactDOM from 'react-dom';

import {CountList} from './countlist';

import './style.scss';

fetch('data.json')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        ReactDOM.render(<CountList data={json} />, document.querySelector('body'));
    }).catch(function(ex){
        console.log(ex);
    });
