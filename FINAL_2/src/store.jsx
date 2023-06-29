const reducer = require("./reducer/index.jsx");
const redux = require("redux");

const createBrowserHistory =  require('history').createBrowserHistory;
const routerMiddleware = require("react-router-redux").routerMiddleware;


const history = createBrowserHistory();
const store = redux.createStore(reducer(history), {}, 
    redux.compose(
        redux.applyMiddleware(
            routerMiddleware(history)
        )
    )
    );

    store.dispatch({ /*предоставляет возможность обновления состояния с помощью dispatch(action)*/
    type: "INIT",
    user: {
        name: "Дмитрий", // То что находится в первом посте
        age: "30" // То что находится в первом посте
    },
    posts: [ // В reducer обозначен как массив старого и нового состояния (return -> POST_ADD)
        {
            id: 1, // То что находится в первом посте
            name: "Первый пост", // То что находится в первом посте
            text: "Ланч на калифорнийском пляже!", // То что находится в первом посте
            image: "no-image.png", // То что находится в первом посте
            date: new Date(), // То что находится в первом посте
            likes: 0, // То что находится в первом посте
        }
    ],
    comments: [
        {
            id: 1,
            productId: 1,
            author: "Мистер Бин",
            text: "Откуда такие деньги?!"
        },
        {
            id: 2,
            productId: 1,
            author: "Товарищ из Лепеля",
            text: "Класс!"
        },
    ],
    lastIdPost: 1,
    lastIdComment: 2
});

module.exports = {store, history};