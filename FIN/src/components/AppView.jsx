const React = require("react");

const {Route, Switch} = require("react-router");
const Header = require("../common/Header.jsx")
const Footer = require("../common/Footer.jsx")
const Main = require("./Main.jsx");

const AppView = () => {

    return <>
        <Header/>
        <Switch> 
            <Route exact path="/" component={Main}/>

        </Switch>
        <Footer/>
    </>;

}


module.exports = AppView;