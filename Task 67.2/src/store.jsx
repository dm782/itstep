const reducer = require("./reducer/reducer.jsx");
const redux = require("redux");

const store = redux.createStore(reducer);

store.dispatch({ // Вы отправляете их в стор, * используя метод store.dispatch(). Метод dispatch находится в store.jsx
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
            quantity: 1,
            favorite: false
        }
    ],
    lastIdProduct: 1
});

module.exports = store;