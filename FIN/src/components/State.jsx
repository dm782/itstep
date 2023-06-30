const React = require("react");

const State = () => {

    return <>
    <div className="information-data">
        <div className="container">
            <div className="information-data_inputs">
                <div className="information-data_input-date">
                    <label for="start-date">Дата начала:</label>
                    <input type="date" className="start-date" name="start-date"/>
             </div>
                <div className="information-data_full-zp">
                    <label for="full_zp_input">Сумма полной зарплаты:</label>
                    <input type="number" className="full_zp_input" name="full_zp_input"/>
                </div>
                <div className="information-data_expenses">
                    <label for="expenses_input">Обязательные траты:</label>
                    <input type="number" className="expenses_input" name="expenses_input"/>
                </div>
                <div className="information-data_current_spend-money">
                    <label for="new_spend">Новая трата:</label>
                    <input type="number" className="expenses_input" name="new_spend"/>
                </div>
            </div>
            <div className="infomation-data_buttons">
                <div className="information-data_delete_last_spend-money">
                    <button>Удалить последнюю тарату</button>
                </div>
                <div className="button_result">
                    <button>Добавить</button>
                </div>
            </div>
            <div className="sum_div">
                <h3>0.00</h3>
            </div>
        </div>
    </div>
    </>
}

module.exports = State;