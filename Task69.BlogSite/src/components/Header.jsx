const React = require("react");
const connect = require("react-redux").connect;
const {push} = require("connected-react-router");

const Header = (props) => {


    return  <>
                <ul className="nav navbar-nav">
                    <li className="nav-item" onClick={() => {props.push("/")}}>
                        Главная
                    </li>
                    <li className="nav-item" onClick={() => {props.push("/post/")}}>
                        Посты
                    </li>
                    <li className="nav-item" onClick={() => {props.push("/post/add")}}>
                        Добавить
                    </li>
                </ul>
            </>;   
}

module.exports = connect(null, {push})(Header);