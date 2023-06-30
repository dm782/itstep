const React = require("react");

const Expense = () => {

    return <>
        <div class="expenses_area">
        <div class="container">
            <div class="full_expenses">
                <h4>Сколько всего денег потрачено:</h4>
                <p>0.00</p>
            </div>
            <div class="center_expenses">
                <h4>Средняя сумма чека:</h4>
                <p>0.00</p>
            </div>
        </div>
    </div>
    </>
}

module.exports = Expense;