const React = require("react");
const connect = require("react-redux").connect;
const {EDIT_POST} = require("../actions/actions.jsx");

const FormEdit = (props) => {

    const routeParams = props.match.params; //props.match.params - объект с параметрами адреса
    // props.match.params - стандартное обращение к параметрам маршрута
    // props.match.params.id - id, который передается в адресе

    const post = props.posts.find((post) => post.id == routeParams.id);

    let [data, setData] = React.useState({
        name: post.name,
        text: post.text,
        image: post.image,
    });

    function handleFormSubmit(event){
        event.preventDefault();
        props.onPostEdit(post.id, data);
        setData({
            name: "",
            text: "",
            image: "",
        });
        props.history.push("/post/") //редирект
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
    return (<>
        <form className="blog_form" action="" onSubmit={handleFormSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Название</label>
                <input type="text" className="form-control" id="name" onChange={handleNameChange} value={data.name}/>
                {/* {formError.name != "" && <div className="red">{formError.name}</div>} formError.name не равно пустому значению, вывести div с ошибкой */}
            </div>
            <div className="mb-3">
                <label htmlFor="text" className="form-label">Текст</label>
                <input type="text" className="form-control" id="text" onChange={handleTextChange} value={data.text}/> {/*value - заполнение информации после нажатия на кнопку*/}
                {/* {formError.text != "" && <div className="red">{formError.text}</div>} formError.text не равно пустому значению, вывести div с ошибкой */}
            </div>
            <label htmlFor="image" className="form-label">Картинка</label>
            <input type="text" className="form-control" id="image" onChange={handleImgChange} value={data.image}/>
            {/* {formError.image != "" && <div className="red">{formError.image}</div>} formError.image не равно пустому значению, вывести div с ошибкой */}
            <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Сохранить</button>
                            <button type="button" className="btn btn-secondary" onClick={()=>{props.history.push("/post/")}}>Отмена</button>
            </div>
        </form>
</>)
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts
    }
};

const mapDispatchToProps = dispatch => ({
    onPostEdit: (id, post) => {
        dispatch({
            type: EDIT_POST, id, post
        })
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(FormEdit);