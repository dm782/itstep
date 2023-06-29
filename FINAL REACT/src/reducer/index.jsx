const redux = require("redux");

const connectRouter = require("connected-react-router").connectRouter;

const reducers = (history) => redux.combineReducers({
    router: connectRouter(history)
})


module.exports = reducers;