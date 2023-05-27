/*
 * PRODUСT_ADD - добавить продукт
 * PRODUCT_DELETE - удалить продукт
 * PRODUCT_EDIT - редактировать продукт
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

module.exports = {addProduct, deleteProduct, editProduct}