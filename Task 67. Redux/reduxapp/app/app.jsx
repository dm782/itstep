const React = require("react");
const ReactDOM = require("react-dom/client");
const redux = require("redux");
const Provider = require("react-redux").Provider; // В render есть файл
const reducer = require("./reducer.jsx"); // Подключаемый файл reducer.jsx из папки app
const AppView = require("./appview.jsx"); // Подключаемый файл appview.jsx из папки app
 
const store = redux.createStore(reducer); 
 
store.dispatch({
  type: "SET_STATE",
  state: {
    phones: [ "Xiaomi Mi 10","dima"] // Названия телефонов уже имеющихся в массиве
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