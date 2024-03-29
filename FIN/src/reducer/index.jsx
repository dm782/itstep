const redux = require("redux");
const sum = require("../reducer/sum.jsx");
const connectRouter = require("connected-react-router").connectRouter;

const reducers = (history) => redux.combineReducers({
    sum: sum,
    router: connectRouter(history)
})


module.exports = reducers;