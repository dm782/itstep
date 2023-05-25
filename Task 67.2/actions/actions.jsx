//Экшены — это структуры, которые передают данные из вашего приложения в стор.
// Они являются единственными источниками информации для стора.
// Вы отправляете их в стор, используя метод store.dispatch().

const addProduct = function (product) { // Типы должны быть, как правило, заданы, как строковые константы, Экшены — это обычные JavaScript-объекты
    return {
      type: "ADD_PRODUCT", // Экшены должны иметь поле type, которое указывает на тип исполняемого экшена
      product
    }
  };
  const deleteProduct = function (product) { // Типы должны быть, как правило, заданы, как строковые константы, Экшены — это обычные JavaScript-объекты
    return {
      type: "DELETE_PRODUCT", // Экшены должны иметь поле type, которое указывает на тип исполняемого экшена
      product
    }
  };
  const editProduct = function (product) { // Типы должны быть, как правило, заданы, как строковые константы, Экшены — это обычные JavaScript-объекты
    return {
      type: "EDIT_PRODUCT", // Экшены должны иметь поле type, которое указывает на тип исполняемого экшена
      product
    }
  };
  module.exports = {addProduct, deleteProduct, editProduct};