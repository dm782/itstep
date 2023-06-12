const reducer = (state = {}, action) => {
// Редьюсеры определяют, как состояние приложения изменяется в ответ на экшены, отправленные в стор
    switch(action.type){
        case "INIT":
            return {...state, //...state - старое состояние
                posts: action.posts, //posts - указано в store
                user: action.user,
                lastIdPost: action.lastIdPost
            }
        case "POST_ADD": // Беру из action, внутренности показывают как будет выглядеть пост
            let newId = ++state.lastIdPost; // Если убрать ++ - при нажатии на удаление, удаляет все посты 
            let newPost  = {
                id: newId, // Добавил убралась ошибка с key
                name: action.post.name, // Передаем из Экшена свойство name
                text: action.post.text, // Передаем из Экшена свойство text
                image: action.post.image, // Передаем из Экшена свойство image
                date: new Date(), // Передаем из Экшена свойство date
                likes: 0, // Передаем из Экшена свойство name
            };
            return {...state, //...state - старое состояние
                    posts: [...state.posts, newPost],  // В store объект posts в виде старого состояния, newPost - новое состояние (обозначено выше в reducer)
                    lastIdPost: newId //Возврат id
                    }; 

                    case "LIKE_PLUS": { // Название заданное в action
                        return {...state, //...state - старое состояние
                            posts: state.posts.map((item) => { // posts - задали в store
                                if(item.id == action.postId){ // item.id - это идентификатор поста, Обращаюсь согласно action, postId - метод указанный в action
                                    return {...item, likes: item.likes + 1}; // Именно эта строчка увеличивает на 1 значение лайков...item - старое значение поста, увеличение значение likes на 1                        
                                }
                                return item; // Возврат нового значения у поста, при отсутствии меняет только у первого, при наличии последующих всё пропадает
                            })
                        }
                    }
        case "POST_DELETE":
            return {...state, // ...state - старое состояние
                    posts: state.posts.filter((item) => item.id != action.postId) // Обращаюсь согласно action (action.postId)
                    }
        case "POST_EDIT":
            break;
            
    }
    return state;
}

module.exports = reducer;