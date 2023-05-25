const connect = reqire("react-redux").connect;
const actions = require("../actions/actions.jsx");

const appView = (props) => {

    <h1>Hello world!</h1>

}

const mapStateToProps = (state) => {

    return  {
        products: state.products,
        currentUser: stateUser,
    }

}

module.exports = connect(mapStateToProps, actions)(AppView);