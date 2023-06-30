const React = require("react");
const connect = require("react-redux").connect;

const Header = () => {

    return  <div className="top-row">
    <div className="container">
        <div className="logo">
            <a href="#">
                <img src="./public/assets/img/money.png" alt="Money" title="Money"/>
            </a>
        </div>
        <div className="site-menu">
            <ul>
                <li><a href="/">Главная</a></li>
                <li><a href="/state">Текущее состояние</a></li>
                <li><a href="/dream">Когда накоплю на мечту?</a></li>
                <li><a href="/expense">Общее и Среднее количество трат</a></li>
                <li><a href="/about">О приложении</a></li>
            </ul>
        </div>
        <div className="burger-menu">
            <div className="burger"></div>
            <div className="burger"></div>
            <div className="burger"></div>
        </div>
    </div>
</div>
};


module.exports = connect()(Header);