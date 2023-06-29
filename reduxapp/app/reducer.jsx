const Map = require("immutable").Map; // const Map - название нашей переменной, 
//require - подключение, immutable - название пакета, который мы подключаем, require("immutable").Map - кподключение объекта Map из пакета immutable; Map = {} - неизменяемый
 
const reducer = function(state = Map(), action) { // Map() - наша переменная
  switch (action.type) {
    case "SET_STATE":
        return state.merge(action.state);
    case "ADD_PHONE":
        return state.update("phones", (phones) => [...phones, action.phone]);
    case "DELETE_PHONE":
        return state.update("phones",
            (phones) => phones.filter(
                (item) => item !== action.phone
            )
        );
  }
  return state;
}
module.exports = reducer;