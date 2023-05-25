const React = require("react");
const ReactDOM = require("react-dom/client");
const store = require("../reducer/store.jsx");
const AppView = require("../components/appView.jsx");


 
ReactDOM.createRoot(
    document.getElementById("app")
)
.render(
    <Provider store = {store}>
        <AppView/>
    </Provider>
);

