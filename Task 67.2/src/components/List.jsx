const React = require("react"); // Форма отображения таблицы

const List = (props) => {
    
    function handleButtonClick(event){
        props.onProductDelete(+event.currentTarget.dataset.id);
    }

    return <>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th> {/*Названия ячеек таблицы*/}
                    <th scope="col">Название</th> {/*Названия ячеек таблицы*/}
                    <th scope="col">Цена</th> {/*Названия ячеек таблицы*/}
                    <th scope="col">Количество</th> {/*Названия ячеек таблицы*/}
                    <th scope="col">Нравится</th> {/*Названия ячеек таблицы*/}
                </tr>
            </thead>
            <tbody>
                {props.products.map((item, index)=>{
                        return  <tr key={item}>
                                    <th scope="row">{index+1}</th> {/*Заполнение таблицы данными*/}
                                    <td>{item.name}</td> {/*Заполнение таблицы данными*/}
                                    <td>{item.price}</td> {/*Заполнение таблицы данными*/}
                                    <td>{item.quantity}</td> {/*Заполнение таблицы данными*/}
                                    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                    </svg></td> 
                                    
                                    <td>
                                        <button className="button_trash" data-id={item.id} onClick={handleButtonClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                            </svg> 
                                        </button>
   
                                    </td>
                                </tr>
                    })
                }

            </tbody>
        </table>
    </>
}


module.exports = List;