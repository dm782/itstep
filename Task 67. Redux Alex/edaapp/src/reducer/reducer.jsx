const reducer = (state = {}, action) => {

    switch(action.type){
        case "INIT":
            return {...state,
                products: action.products,
                user: action.user,
                lastIdProduct: action.lastIdProduct
            }
        case "PRODUСT_ADD":
            let newId = ++state.lastIdProduct;
            let newProduct  = {
                id: newId,
                name: action.product.name,
                price: action.product.price,
                quantity: action.product.quantity
            };
            state.products.push(newProduct);
            return {...state, 
                    products: state.products, 
                    lastIdProduct: newId
                    }; 
        case "PRODUСT_DELETE":
            return {...state, 
                    products: state.products.filter((item) => item.id != action.productId)
                    }
        case "PRODUСT_EDIT":
            break;
            
    }
    return state;
}

module.exports = reducer;