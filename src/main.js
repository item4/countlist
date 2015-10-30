import React from 'react';
import ReactDOM from 'react-dom';

import {CountList} from 'countlist';

import 'style.scss';

let data;
let sort_orders = {
    'id': 'asc',
    'watched': 'asc',
    'total': 'asc',
    'score': 'asc',
    'status': 'asc',
    'category': 'asc',
    'title': 'asc',
    'series': 'asc',
    'start': 'asc'
};

function toggle_sort_order(cond) {
    sort_orders[cond] = sort_orders[cond] === 'asc' ? 'desc' : 'asc';
}

let sort = (cond) => () => {
    let sort_func;
    switch (cond) {
        case 'id':
        case 'watched':
        case 'total':
        case 'score':
            if (sort_orders[cond] === 'asc') {
                sort_func = (a, b) => { return a[cond]-b[cond]; };
            } else {
                sort_func = (a, b) => { return b[cond]-a[cond]; };
            }
            break;
        case 'status':
        case 'category':
        case 'title':
        case 'series':
        case 'start':
        default:
            if (sort_orders[cond] === 'asc') {
                sort_func = (a, b) => { return a[cond] === b[cond] ? 0 : a[cond] > b[cond] ? -1 : 1; };
            } else {
                sort_func = (a, b) => { return a[cond] === b[cond] ? 0 : b[cond] > a[cond] ? -1 : 1; };
            }
            break;
    }
    data.sort(sort_func);
    render(data);
    toggle_sort_order(cond);
};

function render(data) {
    ReactDOM.render(<CountList data={data} sort={sort} />, document.querySelector('body'));
}

fetch('data.json')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        data = json;
        render(json);
    }).catch(function(ex){
        console.log(ex);
    });
