const React = require("react");
const connect = require("react-redux").connect;
const {POST_ADD} = require("../actions/actions.jsx");

/*Форма заполнения информацией*/

const FormAdd = (props) => {

    let [data, setData] = React.useState({
        name: "", // Значение имеющееся в input изначально
        text: "", // Значение имеющееся в input изначально
        image: "", // Значение имеющееся в input изначально
    }) 

    const [formError, setFormError] = React.useState({
        name: "", // Как выглядит элемент ошибки без каких-либо манипуляций
        text: "", // Как выглядит элемент ошибки без каких-либо манипуляций
        image: "" // Как выглядит элемент ошибки без каких-либо манипуляций
    }); 

    function handleFormSubmit(event){ // Функция добавления формы
        event.preventDefault(); // Не перезагружать страницу при нажатии на кнопку Добавить
        if(!validate()){ // Если input пустой БЕЗ ЭТОГО НЕ РАБОТАЕТ!!! (Если НЕ validate) Добавка ошибки в форму
            return false;  // Возврат false БЕЗ ЭТОГО НЕ РАБОТАЕТ!!! Добавка ошибки в форму
        } // Закрыть БЕЗ ЭТОГО НЕ РАБОТАЕТ!!! Добавка ошибки в форму
        props.onPostAdd(data); //Добавление поста

        setData({
            name: "", // Значение имеющееся в input после нажатия на кнопку добавить
            text: "", // Значение имеющееся в input после нажатия на кнопку добавить
            image: "", // Значение имеющееся в input после нажатия на кнопку добавить
        });
        props.history.push("/post/")
    }

    function handleNameChange(event){
        setData({...data, name: event.target.value}); // Функция считывает Название поста
    }

    function handleTextChange(event){
        setData({...data, text: event.target.value}); // Функция считывает Текст поста
    }
    function handleImgChange(event){
        setData({...data, image: event.target.value}); // Функция считывает Название картинки
    }

    function validate(){
        
        let isValid = true; // Переменная равна true
        if(data.name == ""){ // Если data.name равно пустому значению
            formError.name = "Поле не заполнено"; // Писать "Поле не заполнено"
            isValid = false; // Переменная равна false, без этой строчки тоже всё работает
        } else { // Иначе
            formError.name = ""; // Иначе ниего не писать
        }
        if(data.text == "") { // Если data.text равно пустому значению
            formError.text = "Поле не заполнено"; // Писать "Поле не заполнено"
            isValid = false; // Переменная равна false, без этой строчки тоже всё работает
        } else { // Иначе
            formError.text = ""; // Иначе ниего не писать
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
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Название</label>
                            <input type="text" className="form-control" id="name" onChange={handleNameChange} value={data.name}/>
                            {formError.name != "" && <div className="red">{formError.name}</div>} {/*formError.name не равно пустому значению, вывести div с ошибкой*/}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Текст</label>
                            <input type="text" className="form-control" id="price" onChange={handleTextChange} value={data.text}/> {/*value - заполнение информации после нажатия на кнопку*/}
                            {formError.text != "" && <div className="red">{formError.text}</div>} {/*formError.text не равно пустому значению, вывести div с ошибкой*/}
                        </div>
                        <label htmlFor="image" className="form-label">Картинка</label>
                        <input type="text" className="form-control" id="image" onChange={handleImgChange} value={data.image}/>
                        {formError.image != "" && <div className="red">{formError.image}</div>} {/*formError.image не равно пустому значению, вывести div с ошибкой*/}
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Добавить</button>
                        </div>
                    </form>
    </>)
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => ({
    onPostAdd: (post) => {
        dispatch({
            type: POST_ADD, post
        })
    },
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(FormAdd);