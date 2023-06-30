const React = require("react");

const Dream = () => {

    return <>
        <div class="dream_area">
        <div class="container">
            <div class="dream_label-and-input">
                <label>Сумма мечты:</label>
                <input type="number" class="dream_input" name="new_spend"/>
            </div>
            <div class="dream_result">
                <h3>01-01-2023</h3>
                <button>Вывести дату</button>
            </div>        
        </div>
    </div>
    </>
}

module.exports = Dream;