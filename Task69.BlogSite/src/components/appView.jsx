const React = require("react");
const UserInfo = require("./UserInfo.jsx");
const FormAdd = require("./FormAdd.jsx");
const List = require("./List.jsx");
const {Route, Switch} = require("react-router");
const NewList = require("./NewList.jsx");
const Header = require("./Header.jsx");
const FormEdit = require("./FormEdit.jsx");


const AppView = () => {

    return <div>
        <Header/>
        <Switch> 
            <Route exact path="/" component={UserInfo}/>
            <Route path="/post/add" component={FormAdd}/>
            <Route path="/post/edit/:id" component={FormEdit}/>
            <Route path="/post/:id" component={NewList}/>
            <Route path="/post/" component={List}/>
        </Switch>
        <footer></footer>
    </div>;
    
}


module.exports = AppView;