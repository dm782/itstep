const React = require("react");
const ReactDOM = require("react-dom/client");
const redux = require("redux");
const Provider = require("react-redux").Provider;
const reducer = require("./reducer.jsx");
const AppView = require("./appview.jsx"); 

// require = import - подключить
 
const store = redux.createStore(reducer);
 
store.dispatch({
  type: "SET_STATE",
  state: {
    phones: [ "Xiaomi Mi 10", "Samsung Galaxy Note20" ]
  }
});
 
ReactDOM.createRoot(
    document.getElementById("app")
)
.render(
  <Provider store={store}>
    <AppView />
  </Provider>
);