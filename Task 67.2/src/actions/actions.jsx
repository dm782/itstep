/*
 * PRODUСT_ADD - добавить продукт
 * PRODUCT_DELETE - удалить продукт
 * PRODUCT_EDIT - редактировать продукт
 * 
 * Экшены — это структуры, которые передают данные из вашего приложения в стор. 
 * Они являются единственными источниками информации для стора. Вы отправляете их в стор, 
 * используя метод store.dispatch(). Метод dispatch находится в store.jsx
 */

const addProduct = (product) => {
  return {
      type: "PRODUСT_ADD",
      product
  }
}

const deleteProduct = (productId) => {
  return {
      type: "PRODUСT_DELETE",
      productId
  }
}

const editProduct = (id, product) => {
  return {
      type: "PRODUСT_EDIT",
      id,
      product
  }
}

const likeProduct = (like) => {
  return{
    type: "PRODUCT_LIKE",
    like,
  }
}

const dislikeProduct = (dislike) => {
  return{
    type: "PRODUCT_DISLIKE",
    dislike,
  }
}

module.exports = {addProduct, deleteProduct, editProduct, likeProduct, dislikeProduct}