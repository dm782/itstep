const reducer = require("./reducer/index.jsx");
const redux = require("redux");

const createBrowserHistory =  require('history').createBrowserHistory;
const routerMiddleware = require("react-router-redux").routerMiddleware;


const history = createBrowserHistory();
const store = redux.createStore(reducer(history), {}, 
    redux.compose(
        redux.applyMiddleware(
            routerMiddleware(history)
        )
    )
);

store.dispatch({
    type: "INIT",
    newSum: [
        {      
            id: 1,
            date: 0,
            sumFullSalary: 0,
            expense: 0,
            addExp: 0,
        }
    ],
});

module.exports = {store, history};
