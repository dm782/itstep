const React = require("react");
const connect = require("react-redux").connect;
const actions = require("../actions/actions.jsx");
const UserInfo = require("./UserInfo.jsx");
const FormAdd = require("./FormAdd.jsx");
const List = require("./List.jsx");

const AppView = (props) => { //props.posts, props.currentUser

    return <>
        <UserInfo user={props.currentUser}/>
        <FormAdd onPostAdd={props.addPost}/> {/*Компонент FormAdd onPostAdd - задан в FormAdd*/}
        <List posts={props.posts} onPostDelete={props.deletePost} onProductFavorite={props.likePlus}/> {/*props.onProductFavorite и props.onPostDelete - в List.jsx props.posts - в вёрстке List.jsx*/}
    </>;

}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        currentUser: state.user
    }
}

module.exports = connect(mapStateToProps, actions)(AppView);