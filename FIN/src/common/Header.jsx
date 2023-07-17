const React = require("react");
const { connect } = require("react-redux");
const { push } = require("connected-react-router");

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="top-row">
        <div className="container">
          <div className="logo">
            <a href="#">
              <img src="./public/assets/img/money.png" alt="Money" title="Money" />
            </a>
          </div>
          <div className="site-menu">
            <ul className={isMenuOpen ? "menu-open" : ""}>
              <li onClick={() => { props.push("/") }}>Главная</li>
              <li onClick={() => { props.push("/state/") }}>Добавить данные начала ведения статистики</li>
              <li onClick={() => { props.push("/sumadd/") }}>Добавить трату</li>
              <li onClick={() => { props.push("/list/") }}>Таблица трат</li>
            </ul>
          </div>
          <div className="burger-menu" onClick={toggleMenu}>
            <div className={`burger ${isMenuOpen ? "active" : ""}`}></div>
            <div className={`burger ${isMenuOpen ? "active" : ""}`}></div>
            <div className={`burger ${isMenuOpen ? "active" : ""}`}></div>
          </div>
        </div>
      </div>
    </>
  );
};

module.exports = connect(null, { push })(Header);


// const React = require("react");
// const connect = require("react-redux").connect;

// const Header = () => {

//     return  <div className="top-row">
//     <div className="container">
//         <div className="logo">
//             <a href="#">
//                 <img src="./public/assets/img/money.png" alt="Money" title="Money"/>
//             </a>
//         </div>
//         <div className="site-menu">
//             <ul>
//                 <li><a href="/">Главная</a></li>
//                 <li><a href="/state">Добавить данные начала ведения статистики и зарплате</a></li>
//                 <li><a href="/sumadd">Добавить трату</a></li>
//                 <li><a href="/list">Таблица трат</a></li>
//                 <li><a href="/dream">Когда накоплю на мечту?</a></li>
//                 <li><a href="/expense">Общее и Среднее количество трат</a></li> 
//                 {/* <li><a href="/about">О приложении</a></li> */}
//             </ul>
//         </div>
//         <div className="burger-menu">
//             <div className="burger"></div>
//             <div className="burger"></div>
//             <div className="burger"></div>
//         </div>
//     </div>
// </div>
// };


// module.exports = connect()(Header);