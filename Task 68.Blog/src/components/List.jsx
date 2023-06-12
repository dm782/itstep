const React = require("react");

const List = (props) => {
    
    function handleButtonClick(event){       
        props.onPostDelete(+event.currentTarget.dataset.id); // onPostDelete - Переноситься в AppView onPostDelete={props.deletePost}
    }
    function handleFavoriteClick(event){
        props.onProductFavorite(+event.currentTarget.dataset.id); // onProductFavorite - Переноситься в AppView onProductFavorite={props.likePlus}
    }



    return <>
        <div className="table">
                {props.posts.map((item, index)=>{ // posts - задан в store Параметр item в методе map представляет собой текущий обрабатываемый элемент массива, а параметр index представляет индекс этого элемента в массиве 3.
                        return  <div key={item.id}> {/*Свойство объекта id*/}
                                <img src={`/img/${item.image}`} alt="" className="img_article"/> {/*Возврат картинки по названию*/}
                                    <div>#{index+1}</div> {/*Можно добавить # - для добавления в форме, начало с нулевого индекса потому +1*/}
                                    <h1>{item.name}</h1> {/*Свойство объекта name, указываю то указывал в reducer в названиях свойств объектов*/}
                                    <div>{item.text}</div> {/*Свойство объекта text, указываю то указывал в reducer в названиях свойств объектов*/}
                                    <p className="card-text"><small className="text-body-secondary">{item.date.toLocaleDateString()}</small></p> {/*item.date.toLocaleDateString() - возврат элеиент со свойством даты*/}
                                    <div>
                                    
                                        <button className="button_favorite" data-id={item.id} onClick={handleFavoriteClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div><p>{item.likes}</p></div> {/*item.likes - это свойство объекта className="likes" - в p был класс */}
                                    <div>
                                        <button className="button_trash" data-id={item.id} onClick={handleButtonClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                            </svg> 
                                        </button>
                                    </div>
                                </div>
                    })
                }

            
        </div>
    </>
}


module.exports = List;