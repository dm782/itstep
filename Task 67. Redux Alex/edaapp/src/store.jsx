/*
state = {
    products: [
        {
            id,
            name,
            price,
            quantity
        }
    ],
    user: {
        name,
        age
    },

    lastIdProduct //- id последнего добавленного продукта
}
*/
const reducer = require("./reducer/reducer.jsx");
const redux = require("redux");

const store = redux.createStore(reducer);

store.dispatch({
    type: "INIT",
    user: {
        name: "Вася Пупкин",
        age: 30
    },
    products: [
        {
            id: 1,
            name: "Молоко",
            price: 5,
            quantity: 1
        }
    ],
    lastIdProduct: 1
});

module.exports = store;
