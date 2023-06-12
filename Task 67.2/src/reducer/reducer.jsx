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
                image: action.product.image,
                name: action.product.name,
                price: action.product.price,
                quantity: action.product.quantity,
                favorite: action.product.favorite,
                edIz: action.product.edIz
            };
            return {...state, 
                    products: [...state.products, newProduct], 
                    lastIdProduct: newId
                    }; 
        case "PRODUСT_DELETE":
            return {...state, 
                    products: state.products.filter((item) => item.id != action.productId)
                    }
        case "PRODUCT_FAVORITE": {
            return {...state,
                products: state.products.map((item) => {
                    if(item.id == action.id){
                        item.favorite = true;
                    }
                    return item;
                })
            }
        }
        case "PRODUCT_UNFAVORITE": {
            return {...state,
                products: state.products.map((item) => {
                    if(item.id == action.id){
                        item.favorite = false;
                    }
                    return item;
                })
            }
        }

        case "PRODUСT_EDIT":
            break;
            
    }
    return state;
}

module.exports = reducer;