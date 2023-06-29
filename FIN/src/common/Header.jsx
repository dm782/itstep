const React = require("react");
const connect = require("react-redux").connect;

const Header = () => {

    return  <div class="top-row">
    <div class="container">
        <div class="logo">
            <a href="#">
                <img src="./img/money.png" alt="Money" title="Money"/>
            </a>
        </div>
        <div class="site-menu">
            <ul>
                <li><a href="#">Главная</a></li>
                <li><a href="#">Текущее состояние</a></li>
                <li><a href="#">Когда накоплю на мечту?</a></li>
                <li><a href="#">Общее и Среднее количество трат</a></li>
                <li><a href="#">О приложении</a></li>
            </ul>
        </div>
        <div class="burger-menu">
            <div class="burger"></div>
            <div class="burger"></div>
            <div class="burger"></div>
        </div>
    </div>
</div>
};


module.exports = connect()(Header);