const React = require("react");

const FormAdd = (props) => {

    let [data, setData] = React.useState({
        image: "",
        name: "",
        price: "",
        quantity: "",
        edIz: "",
        favorite: false
    }) 

    const [formError, setFormError] = React.useState({
        image: "",
        name: "",
        price: "",
        quantity: "",
        edIz: "",
    }); 

    function handleFormSubmit(event){
        event.preventDefault();
        if(!validate()){ // Если input пустой БЕЗ ЭТОГО НЕ РАБОТАЕТ!!! (Если НЕ validate) Добавка ошибки в форму
            return false;
        }
        props.onProductAdd(data);
        setData({
            image: "",
            name: "",
            price: "",
            quantity: "",
            edIz: "",
            favorite: false 
        });
        
    }

    function handleNameChange(event){
        setData({...data, name: event.target.value});
    }
    function handleImgChange(event){
        setData({...data, image: event.target.value});
    }
    function handlePriceChange(event){
        setData({...data, price: event.target.value});
    }

    function handleQuantityChange(event){
        setData({...data, quantity: event.target.value});
    }
    function handleFavoriteChange(event){
        setData({...data, favorite: event.target.checked});
    }
    function handleEdIzmChange(event){
        setData({...data, edIz: event.target.value});
    }
    function validate(){
        
        let isValid = true; // Переменная равна true
        if(data.name == ""){ // Если data.name равно пустому значению
            formError.name = "Поле не заполнено"; // Писать "Поле не заполнено"
            isValid = false; // Переменная равна false, без этой строчки тоже всё работает
        } else { // Иначе
            formError.name = ""; // Иначе ниего не писать
        }
        if(data.price == "") { // Если data.text равно пустому значению
            formError.price = "Поле не заполнено"; // Писать "Поле не заполнено"
            isValid = false; // Переменная равна false, без этой строчки тоже всё работает
        } else { // Иначе
            formError.price = ""; // Иначе ниего не писать
        }
        if(data.quantity == "") { // Если data.text равно пустому значению
            formError.quantity = "Картинка не выбрана"; // Писать "Картинка не выбрана"
            isValid = false; // Переменная равна false, без этой строчки тоже всё работает
        } else { // Иначе
            formError.quantity = ""; // Иначе ниего не писать
        }
        if(data.image == "") { // Если data.text равно пустому значению
            formError.image = "Картинка не выбрана"; // Писать "Картинка не выбрана"
            isValid = false; // Переменная равна false, без этой строчки тоже всё работает
        } else { // Иначе
            formError.image = ""; // Иначе ниего не писать
        }

        setFormError({...formError}); // ...formError - старое состояние, используется для установки состояния ошибки формы. setFormError - новое состояние
        return isValid; // Возврат isValid
    }
    return (<>
                    <form className="blog_form" action="" onSubmit={handleFormSubmit}>
                    <label htmlFor="image" className="form-label">Картинка</label>
                        <input type="text" className="form-control" id="image" onChange={handleImgChange} value={data.image}/>
                        {formError.image != "" && <div className="red">{formError.image}</div>}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Название</label>
                            <input type="text" className="form-control" id="name" onChange={handleNameChange} value={data.name}/>
                            {formError.name != "" && <div className="red">{formError.name}</div>} {/*formError.name не равно пустому значению, вывести div с ошибкой*/}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Цена</label>
                            <input type="text" className="form-control" id="price" onChange={handlePriceChange} value={data.price}/>
                            {formError.name != "" && <div className="red">{formError.name}</div>} {/*formError.name не равно пустому значению, вывести div с ошибкой*/}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Количество</label>
                            <input type="text" className="form-control" id="quantity" onChange={handleQuantityChange}  value={data.quantity}/>
                            {formError.name != "" && <div className="red">{formError.name}</div>} {/*formError.name не равно пустому значению, вывести div с ошибкой*/}
                        </div>
                        <label htmlFor="edIz" className="form-label">Единица измерения</label>
                        <select class="form-select" aria-label="Default select example" onChange={handleEdIzmChange}>
                            <option value="Кг.">Кг.</option>
                            <option value="Л.">Л.</option>
                            <option value="Шт.">Шт.</option>
                        </select>
                        <div className="mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="favorite" onChange={handleFavoriteChange} checked={data.favorite}/>
                                <label className="form-check-label" htmlFor="favorite">
                                    Избранное
                                </label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Добавить</button>
                        </div>
                    </form>
    </>)
}

module.exports = FormAdd;