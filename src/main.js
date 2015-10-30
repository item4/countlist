import React from 'react';
import ReactDOM from 'react-dom';

import {CountList} from 'countlist';

import 'style.scss';

let data;
let sortOrder = {
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

function toggleSortOrder(cond) {
    sortOrder[cond] = sortOrder[cond] === 'asc' ? 'desc' : 'asc';
}

let getSort = (cond) => {
    let sort_func;
    switch (cond) {
        case 'id':
        case 'watched':
        case 'total':
        case 'score':
            if (sortOrder[cond] === 'asc') {
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
            if (sortOrder[cond] === 'asc') {
                sort_func = (a, b) => { return a[cond] === b[cond] ? 0 : a[cond] > b[cond] ? -1 : 1; };
            } else {
                sort_func = (a, b) => { return a[cond] === b[cond] ? 0 : b[cond] > a[cond] ? -1 : 1; };
            }
            break;
    }
    return sort_func;
};

function render(data) {
    ReactDOM.render(<CountList data={data} getSort={getSort} sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />, document.querySelector('body'));
}

fetch('data.json')
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        data = json.sort(getSort('id'));
        toggleSortOrder('id');
        render(data);
    }).catch(function(ex){
        console.log(ex);
    });
