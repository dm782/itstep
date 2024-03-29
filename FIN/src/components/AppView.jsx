const React = require("react");

const {Route, Switch} = require("react-router");
const Header = require("../common/Header.jsx");
const Footer = require("../common/Footer.jsx");
const State = require("./State.jsx");
const Dream = require("./Dream.jsx");
const Sumadd = require("./SumAdd.jsx");
const Expense = require("./Expense.jsx");
const About = require("./About.jsx");
const Main = require("./Main.jsx");
const List = require("./List.jsx");

const AppView = () => {

    return <div>
        <Header/>
        <Switch> 
            <Route exact path="/" component={Main}/>
            <Route exact path="/state" component={State}/>
            <Route exact path="/list" component={List}/>
            <Route exact path="/sumadd" component={Sumadd}/>
            
            
                       
        </Switch>
        <Footer/>
    </div>;

}


module.exports = AppView;