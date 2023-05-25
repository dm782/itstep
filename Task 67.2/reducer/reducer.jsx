// Редьюсеры определяют, как состояние приложения изменяется в ответ на экшены,
// отправленные в стор. Помните, что экшены только описывают, _что произошло,
// но не описывают, как изменяется состояние приложения.

const reducer = (state = {}, action) =>{
    switch(action.type){
        case "PRODUCT_ADD":

            let newId = ++state.lastIdProduct;
            let newProduct = {
                id: newId,
                name: action.product.name,
                price: action.product.price,
                quantity: action.product.quantity
            };
            state.products.push(newProduct);
            return {...state, // ...state - старое состояние
                 product: state.products,
                  lastIdProduct: newId
                };
            case "PRODUCT_DELETE":
                return {...state, // ...state - старое состояние
                products: state.products.filter((item) => item.id != action. productId)
            }
            case "PRODUCT_EDIT":
            break;
    }
    return state;
}

module.exports = reducer;