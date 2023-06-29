const React = require("react");
const connect = require("react-redux").connect;
const {POST_DELETE, LIKE_PLUS, COMMENT_ADD} = require("../actions/actions.jsx");

const NewList = (props) => {
    
    let [data, setData] = React.useState({
        name: "", // Значение имеющееся в input изначально
        text: "", // Значение имеющееся в input изначально
    }) 
    function handleCommentSubmit(event){ // Функция добавления формы
        event.preventDefault(); // Не перезагружать страницу при нажатии на кнопку Добавить
        props.onAddComment(data);
    }

    const routeParams = props.match.params; //props.match.params - объект с параметрами адреса
    // props.match.params - стандартное обращение к параметрам маршрута
    // props.match.params.id - id, который передается в адресе

    const NumberOne = props.posts.find((post) => post.id == routeParams.id);

     function handleButtonClick(event){       
        props.onPostDelete(+event.currentTarget.dataset.id); // onPostDelete - Переноситься в AppView onPostDelete={props.deletePost}
    }
    function handleFavoriteClick(event){
        props.onPostFavorite(+event.currentTarget.dataset.id); // onPostFavorite - Переноситься в AppView onProductFavorite={props.likePlus}
    }
    function handleNameComment(event){
        setData({...data, name: event.target.value}); // Функция считывает Название поста
    }

    function handleTextComment(event){
        setData({...data, text: event.target.value}); // Функция считывает Текст поста
    }

    return <>
        <div className="table">
                 
                          <div> {/*Свойство объекта id*/}
                                <img src={`/img/${NumberOne.image}`} alt="" className="img_article"/> {/*Возврат картинки по названию*/}
                                    
                                    <h1>{NumberOne.name}</h1> {/*Свойство объекта name, указываю то указывал в reducer в названиях свойств объектов*/}
                                    <div>{NumberOne.text}</div> {/*Свойство объекта text, указываю то указывал в reducer в названиях свойств объектов*/}
                                    <p className="card-text"><small className="text-body-secondary">{NumberOne.date.toLocaleDateString()}</small></p> {/*item.date.toLocaleDateString() - возврат элеиент со свойством даты*/}
                                    <div>
                                    
                                        <button className="button_favorite" data-id={NumberOne.id} onClick={handleFavoriteClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div><p>{NumberOne.likes}</p></div> {/*item.likes - это свойство объекта className="likes" - в p был класс */}
                                    <div>
                                        <button className="button_trash" data-id={NumberOne.id} onClick={handleButtonClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                            </svg> 
                                        </button>
                                    </div>
                                    <h5>Комментарии:</h5>
                                </div>            
        </div>
        <div className="comments">
        {props.comments.map((item, index)=>{ // posts - задан в store Параметр item в методе map представляет собой текущий обрабатываемый элемент массива, а параметр index представляет индекс этого элемента в массиве 3.
                        return  <div key={item.id}> {/*Свойство объекта id*/}            
                                    <div>#{index+1}</div> {/*Можно добавить # - для добавления в форме, начало с нулевого индекса потому +1*/}
                                    <div><h6>{item.author}</h6></div> {/*Свойство объекта text, указываю то указывал в reducer в названиях свойств объектов*/}
                                    <div>{item.text}</div>
                                </div>
                    })
                }                            
        </div>
        <div className="comments">
        {props.comments.map((item, index)=>{ // posts - задан в store Параметр item в методе map представляет собой текущий обрабатываемый элемент массива, а параметр index представляет индекс этого элемента в массиве 3.
                        return  <div key={item.id}> {/*Свойство объекта id*/}            
                                    <div>#{index+1}</div> {/*Можно добавить # - для добавления в форме, начало с нулевого индекса потому +1*/}
                                    <div><h6>{item.author}</h6></div> {/*Свойство объекта text, указываю то указывал в reducer в названиях свойств объектов*/}
                                    <div>{item.text}</div>
                                </div>
                    })
                }
                            
        </div>
        <form className="blog_form" action="" onSubmit={handleCommentSubmit}>
        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Название</label>
                            <input type="text" className="form-control" id="name" onChange={handleNameComment} value={data.name}/>
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Текст</label>
                            <input type="text" className="form-control" id="price" onChange={handleTextComment} value={data.text}/> {/*value - заполнение информации после нажатия на кнопку*/}
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Добавить</button>
                            </div>
                        </div>
                        </form>     
        {/* <form action=""></form>
        <div className="add_comment">
            <label htmlFor="">Имя:</label>
            <input type="text" />
            <label htmlFor="">Текст комментария:</label>
            <input type="text" />
            <button>Добавить</button>
        </div> */}
    </>
}


const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        comments: state.post.comments
 //product -  название reducer, описанного в /reducer/index.jsx, products - массив продуктов
    }
};

const mapDispatchToProps = dispatch => ({
    onPostDelete: (postId) => {
        dispatch({
            type: POST_DELETE, postId
        })
    },
    onPostFavorite: (postId) => {
        dispatch({
            type: LIKE_PLUS, postId
        })
    },
    onAddComment: (postId) => {
        dispatch({
            type: COMMENT_ADD, postId
        })
    },  
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(NewList);






// const React = require("react"); // Надо удалить
// const connect = require("react-redux").connect; // Надо удалить
// const {COMMENT_ADD} = require("../actions/actions.jsx");

// const CommentAdd = (props) => {
//     let [data, setData] = React.useState({
//         name: "", // Значение имеющееся в input изначально
//         text: "", // Значение имеющееся в input изначально

//     }) 
    

//     function handleFormSubmit(event){ // Функция добавления формы
//         event.preventDefault(); // Не перезагружать страницу при нажатии на кнопку Добавить
//         props.onCommentAdd(data); //Добавление поста
        
//         setData({
//             name: "", // Значение имеющееся в input после нажатия на кнопку добавить
//             text: "", // Значение имеющееся в input после нажатия на кнопку добавить

//         });
//     }
    

//     function handleNameCommentChange(event){
//         setData({...data, name: event.target.value}); // Функция считывает Название поста
//     }

//     function handleTextCommentChange(event){
//         setData({...data, text: event.target.value}); // Функция считывает Текст поста
//     }

//     return (<>
//         <form className="blog_form" action="" onSubmit={handleFormSubmit}>
//             <div className="mb-3">
//                 <label htmlFor="name" className="form-label">Название</label>
//                 <input type="text" className="form-control" id="name" onChange={handleNameCommentChange} value={data.name}/>
                
//             </div>
//             <div className="mb-3">
//                 <label htmlFor="price" className="form-label">Текст</label>
//                 <input type="text" className="form-control" id="price" onChange={handleTextCommentChange} value={data.text}/> {/*value - заполнение информации после нажатия на кнопку*/}
                
//             </div>
//             <div className="mb-3">
//                 <button type="submit" className="btn btn-primary">Добавить</button>
//             </div>
//         </form>
// </>)
// }

// const mapStateToPropsTwo = state => {
//     return {}
// };

// const mapDispatchToPropsTwo = dispatch => ({
//     onPostAdd: (post) => {
//         dispatch({
//             type: COMMENT_ADD, post
//         })
//     },
// });

// module.exports = connect(mapStateToPropsTwo, mapDispatchToPropsTwo)(CommentAdd);




