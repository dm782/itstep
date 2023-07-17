const React = require("react");
const connect = require("react-redux").connect;
const {SUM_ADD} = require("../action/action.jsx");

const StateAdd = (props) => {

    let [data, setData] = React.useState({
        addExp: 0,
      });

      function handleFormSubmit(event){
        event.preventDefault();
        props.onSumAdd(data);      
        setData({
        addExp: 0,
        });
        props.history.push("/list/")
    }

function handleAddExpChange(event){
    setData({...data, addExp: event.target.value});
  }

    return (<>
    <form className="sum_form" action="" onSubmit={handleFormSubmit}>
    <div className="information-data">
        <div className="container">

                <div className="information-data_current_spend-money">
                    <label htmlFor="new_spend">Новая трата:</label>
                    <input type="text" className="form-control" id="new_spend" onChange={handleAddExpChange} value={data.addExp}/>
                </div>                
            </div>            
            <div className="infomation-data_buttons">
                <div className="information-data_delete_last_spend-money">
                <button type="button" className="btn btn-primary">Удалить последюю трату</button>
                </div>
                <div className="button_result">
                <button type="submit" className="btn btn-primary">Добавить</button>
                </div>
            </div>
        </div>
    
    </form>
    </>)
}

const mapStateToProps = state => {
    return {
        
    }
};

const mapDispatchToProps = dispatch => ({
  onSumAdd: (sum) => {
    if (!isNaN(sum)) { // Проверка, что sum не является NaN
      dispatch({
        type: SUM_ADD,
        sum
      });
    }
  }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(StateAdd);