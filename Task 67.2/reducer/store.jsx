// Ранее я комментировал экшены, которые представляют факт того, что "что-то случилось"
// и редьюсеры, которые обновляют состояние (state) в соответствии с этими экшенами.

const reducer = require("../reducer/reducer.jsx");
const redux = require("redux");

const store = redux.createStore(reducer);

module.exports = store;
