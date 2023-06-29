const React = require("react");

const {Route, Switch} = require("react-router");

const Header = require("./Header.jsx");



const AppView = () => {

    return <div>
        <Header/>
        <Switch> 
            <Route exact path="/" component={Main}/>

        </Switch>
        <footer></footer>
    </div>;
    
}


module.exports = AppView;