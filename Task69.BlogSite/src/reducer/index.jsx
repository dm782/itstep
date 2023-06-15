const redux = require("redux");
const post = require("./post.jsx");
const connectRouter = require("connected-react-router").connectRouter;

const reducers = (history) => redux.combineReducers({
    post: post,
    router: connectRouter(history)
})


module.exports = reducers;