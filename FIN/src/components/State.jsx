const React = require("react");
const connect = require("react-redux").connect;
const State = (props) => {

    let [data, setData] = React.useState({
        date: 0,
        sumFullSalary: 0,
        expense: 0,
        addExp: 0,
      });

      function handleFormSubmit(event){
        event.preventDefault();
        props.onSumAdd(data);
      
//   setData({
//     date: '',
//     sumFullSalary: 0,
//     expense: 0,
//     addExp: 0,
//   });
}

function handleDateChange(event){
  setData({...data, date: event.target.value});
}

function handleSumFullSalaryChange(event){
  setData({...data, sumFullSalary: event.target.value});
}

function handleExpenseChange(event){
  setData({...data, expense: event.target.value});
}

function handleAddExpChange(event){
  setData({...data, addExp: event.target.value});
}

function getResult() {
    return  (new Date() - new Date(data.date)) / 2600000000 * (Number(data.sumFullSalary) - Number(data.expense)) - Number(data.addExp);
}


    return <>
    <form className="sum_form" action="" onSubmit={handleFormSubmit}>
    <div className="information-data">
        <div className="container">
            <div className="information-data_inputs">
                
                <div className="information-data_input-date">
                <label for="start-date">Дата начала:</label>
                <input type="text" className="form-control" id="start-date" onChange={handleDateChange} value={data.date}/>
             </div>
                <div className="information-data_full-zp">
                    <label for="full_zp_input">Сумма полной зарплаты:</label>
                    <input type="text" className="form-control" id="full_zp_input" onChange={handleSumFullSalaryChange} value={data.sumFullSalary}/>
                </div>
                <div className="information-data_expenses">
                    <label for="expenses_input">Обязательные траты:</label>
                    <input type="text" className="form-control" id="expenses_input" onChange={handleExpenseChange} value={data.expense}/>
                </div>
                <div className="information-data_current_spend-money">
                    <label for="new_spend">Новая трата:</label>
                    <input type="text" className="form-control" id="new_spend" onChange={handleAddExpChange} value={data.addExp}/>
                </div>                
            </div>            
            <div className="infomation-data_buttons">
                <div className="information-data_delete_last_spend-money">
                <button type="button" class="btn btn-primary">Удалить последюю трату</button>
                </div>
                <div className="button_result">
                <button type="button" class="btn btn-primary">Добавить</button>
                </div>
            </div>
            
            <div className="sum_div">
                <h3>{getResult()}</h3>
            </div>
        </div>
    </div>
    </form>
    </>
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => ({
    onSumAdd: (sum) => {
        dispatch({
            type: SUM_ADD, sum
        })
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(State);
// module.exports = State;




// !!!РАБОЧАЯ ВЁРСТКА!!!

// const React = require("react");

// const State = () => {

//     return <>
//     <div className="information-data">
//         <div className="container">
//             <div className="information-data_inputs">
//                 <form action="">
//                 <div className="information-data_input-date">
//                 <label for="start-date">Дата начала:</label>
//                 <input type="number" className="start-date" name="start-date"/>
//              </div>
//                 <div className="information-data_full-zp">
//                     <label for="full_zp_input">Сумма полной зарплаты:</label>
//                     <input type="number" className="full_zp_input" name="full_zp_input"/>
//                 </div>
//                 <div className="information-data_expenses">
//                     <label for="expenses_input">Обязательные траты:</label>
//                     <input type="number" className="expenses_input" name="expenses_input"/>
//                 </div>
//                 <div className="information-data_current_spend-money">
//                     <label for="new_spend">Новая трата:</label>
//                     <input type="number" className="expenses_input" name="new_spend"/>
//                 </div>
//                 </form>
//             </div>
            
//             <div className="infomation-data_buttons">
//                 <div className="information-data_delete_last_spend-money">
//                 <button type="button" class="btn btn-primary">Удалить последюю трату</button>
//                 </div>
//                 <div className="button_result">
//                 <button type="button" class="btn btn-primary">Добавить</button>
//                 </div>
//             </div>
            
//             <div className="sum_div">
//                 <h3>0.00</h3>
//             </div>
//         </div>
//     </div>
//     </>
// }

// module.exports = State;