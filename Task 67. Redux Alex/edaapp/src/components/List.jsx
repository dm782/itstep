const React = require("react");

const FormAdd = (props) => {

    let [data, setData] = React.useState({
        name: "",
        price: 0,
        quantity: 0
    }) 

    function handleFormSubmit(event){
        event.preventDefault();
        props.onProductAdd(data);
    }

    function handleNameChange(event){
        setData({...data, name: event.target.value});
    }

    function handlePriceChange(event){
        setData({...data, price: event.target.value});
    }

    function handleQuantityChange(event){
        setData({...data, quantity: event.target.value});
    }

    return (<>
                    <form className="blog_form" action="" onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Название</label>
                            <input type="text" className="form-control" id="name" onChange={handleNameChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Цена</label>
                            <input type="text" className="form-control" id="price" onChange={handlePriceChange}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Количество</label>
                            <input type="text" className="form-control" id="quantity" onChange={handleQuantityChange}/>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Добавить</button>
                        </div>
                    </form>
    </>)
}

module.exports = FormAdd;