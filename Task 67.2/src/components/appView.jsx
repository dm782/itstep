const React = require("react");
const connect = require("react-redux").connect;
const actions = require("../actions/actions.jsx");
const UserInfo = require("./UserInfo.jsx");
const FormAdd = require("./FormAdd.jsx");
const List = require("./List.jsx");

const AppView = (props) => { //props.products, props.currentUser

    return <>
        <UserInfo user={props.currentUser}/> {/*Отображение на экране формы с информацией о пользователе*/}
        <FormAdd onProductAdd={props.addProduct}/> {/*Отображение на экране формы с добавлением продукта*/}
        <List products={props.products} onProductDelete={props.deleteProduct}/> {/*Отображение на экране таблицы с продуктами*/}
    </>;

}

const mapStateToProps = (state) => { // Если что то здесь убрать всё пропадает
    return {
        products: state.products, // Состояние продукта
        currentUser: state.user // Состояние пользователя
    }
}

module.exports = connect(mapStateToProps, actions)(AppView); // Экспорт экшена, переменной состояния, и отображения на экране