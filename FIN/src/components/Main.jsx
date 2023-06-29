const React = require("react");

const Main = () => {

    return <>
    <div class="information-article">
        <div class="container">
            <div class="information-area">
                <div class="information-area_title">
                    <h1>Инновационное приложение по экономии денежных средств<span> Не имеющее аналогов в Рунете</span></h1>
                </div>
                <div class="information-area_text">
                    <p>Данный информационный продукт поможет сэкономить денежные средства, не уходя в "Минус", по уникальной формуле не имеющей аналогов в рускоязычном сегменте Интернет-сети</p>
                </div>
                <div class="button-link_title">
                    <a href="#" class="button_title">Начать</a>
                </div>
            </div>

            <div class="information-area_image">
                <img src=".public/assets/img/home-font.png" alt="Gale invest" title="Image"/>
            </div>

        </div>  
    </div>
    </>
}

module.exports = Main;