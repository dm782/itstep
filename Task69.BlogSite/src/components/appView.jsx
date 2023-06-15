const React = require("react");
const UserInfo = require("./UserInfo.jsx");
const FormAdd = require("./FormAdd.jsx");
const List = require("./List.jsx");
const {Route, Switch} = require("react-router");
// const Nav = require("./Nav.jsx");


const AppView = () => {

    return <div>
        
        <Switch> 
            <Route exact path="/" component={UserInfo}/>
            <Route path="/post/add" component={FormAdd}/>
            <Route path="/post/" component={List}/>
        </Switch>
        <footer></footer>
    </div>;
    
}


module.exports = AppView;