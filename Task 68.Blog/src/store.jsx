const reducer = require("./reducer/reducer.jsx"); // Подключаю reducer
const redux = require("redux");

const store = redux.createStore(reducer); // Создание store

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
    lastIdPost: 1 // lastIdPost: newId - в reducer
});

module.exports = store; // Экспорт store
