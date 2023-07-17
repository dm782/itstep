const React = require("react");
const connect = require("react-redux").connect;
const {SUM_ADD} = require("../action/action.jsx");

const State = (props) => {
    let [data, setData] = React.useState({
      date: 0,
      sumFullSalary: 0,
      expense: 0,
      addExp: 0,
    });
  
    // Функция для сохранения данных в Local Storage
    const saveFormData = () => {
      localStorage.setItem("formData", JSON.stringify(data));
    };
  
    // Обновление данных и сохранение в Local Storage при изменении формы
    const handleFormSubmit = (event) => {
      event.preventDefault();
      props.onSumAdd(data);
      setData({});
      saveFormData();
      props.history.push("/sumadd/");
    };

    const handleDateChange = (event) => {
        setData({ ...data, date: event.target.value });
        saveFormData();
      };
    
      const handleSumFullSalaryChange = (event) => {
        setData({ ...data, sumFullSalary: event.target.value });
        saveFormData();
      };
    
      const handleExpenseChange = (event) => {
        setData({ ...data, expense: event.target.value });
        saveFormData();
      };


// function handleAddExpChange(event){
//     setData({...data, addExp: event.target.value});
//   }



    return (<>
    <form className="sum_form" action="" onSubmit={handleFormSubmit}>
    <div className="information-data">
        <div className="container">
            <div className="information-data_inputs">
                
                <div className="information-data_input-date">
                <label htmlFor="start-date">Дата начала:</label>
                <input type="text" className="form-control" id="start-date" onChange={handleDateChange} value={data.date}/>
             </div>
                <div className="information-data_full-zp">
                    <label htmlFor="full_zp_input">Сумма полной зарплаты:</label>
                    <input type="text" className="form-control" id="full_zp_input" onChange={handleSumFullSalaryChange} value={data.sumFullSalary}/>
                </div>
                <div className="information-data_expenses">
                    <label htmlFor="expenses_input">Обязательные траты:</label>
                    <input type="text" className="form-control" id="expenses_input" onChange={handleExpenseChange} value={data.expense}/>
                </div>
                {/* <div className="information-data_current_spend-money">
                    <label htmlFor="new_spend">Новая трата:</label>
                    <input type="text" className="form-control" id="new_spend" onChange={handleAddExpChange} value={data.addExp}/>
                </div>                 */}
            </div>            
            <div className="infomation-data_buttons">
                <div className="information-data_delete_last_spend-money">
                <button type="button" className="btn btn-primary">Удалить последюю трату</button>
                </div>
                <div className="button_result">
                <button type="submit" className="btn btn-primary">Добавить</button>
                </div>
            </div>
            
            {/* <div className="sum_div">
                <h3>{getResult().toFixed(2)} Руб.</h3>
            </div> */}
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
        dispatch({
            type: SUM_ADD, sum // В середине
        })
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(State);