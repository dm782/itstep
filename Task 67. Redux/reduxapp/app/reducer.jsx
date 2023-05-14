//Сюда добавляем все действия с активностями, например клики на кнопки

const Map = require("immutable").Map; // const Map - название нашей переменной, 
//require - подключение, immutable - название пакета, который мы подключаем, require("immutable").Map - кподключение объекта Map из пакета immutable 
 
const reducer = function(state = Map(), action) { //Map = {} - неизменяемый обращение к переменной из первой строки
  switch (action.type) {
    case "SET_STATE": // используем для инициализации там уже есть телефоны
          return state.merge(action.state); // инициализация начального хранилища, то что уже есть там уже есть телефоны
    case "ADD_PHONE": // Добавить (кнопка)
          return state.update("phones", (phones) => [...phones, action.phone]); // (phones) - есть в app.jsx брать оттуда ...phones - что было до, что стало после добавления 
    case "DELETE_PHONE": // Удалить (кнопка)
          return state.update("phones", // state.update - конкретный метод для обновления
            (phones) => phones.filter(
                (item) => item !== action.phone
            )
        );
  }
  return state;
}
module.exports = reducer;