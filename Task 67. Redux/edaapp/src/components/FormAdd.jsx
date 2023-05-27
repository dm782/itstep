const React = require("react");

const FormAdd = (props) => {

    let [data, setData] = React.userState({
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

    return <>
                    <form class="blog_form" action="" onSubmit={handleFormSubmit}>
                        <div class="mb-3">
                            <label for="name" class="form-label">Название</label>
                            <input type="text" class="form-control" id="name" onChange={handleNameChange} />
                        </div>
                        <div class="mb-3">
                            <label for="price" class="form-label">Цена</label>
                            <input type="text" class="form-control" id="price" onChange={handlePriceChange}/>
                        </div>
                        <div class="mb-3">
                            <label for="quantity" class="form-label">Количество</label>
                            <input type="text" class="form-control" id="quantity" onChange={handleQuantityChange}/>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Добавить</button>
                        </div>
                    </form>
    </>
}

module.exports = FormAdd;