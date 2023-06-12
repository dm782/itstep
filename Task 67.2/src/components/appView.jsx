const React = require("react");{/*Подключение*/}
const connect = require("react-redux").connect; {/*Подключение*/}
const actions = require("../actions/actions.jsx"); {/*Подключение файла*/}
const UserInfo = require("./UserInfo.jsx"); {/*Подключение файла*/}
const FormAdd = require("./FormAdd.jsx"); {/*Подключение файла*/}
const List = require("./List.jsx"); {/*Подключение файла*/}

const AppView = (props) => { //props.products, props.currentUser

    return <>
        <UserInfo user={props.currentUser}/>
        <FormAdd onProductAdd={props.addProduct}/>
        <List products={props.products} onProductDelete={props.deleteProduct} onProductFavorite={props.favoriteProduct} onProductUnfavorite={props.unfavoriteProduct}/>
    </>;

}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        currentUser: state.user
    }
}

module.exports = connect(mapStateToProps, actions)(AppView);