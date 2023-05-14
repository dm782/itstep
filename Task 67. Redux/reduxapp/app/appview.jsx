// В этом файле прописывается весь основной код html и JS

const React = require("react");
const connect = require("react-redux").connect;
const actions = require("./actions.jsx");
  
class PhoneForm extends React.Component {
  constructor(props) {
    super(props);
    this.phoneInput = React.createRef();
  }
  onClick() {
    if (this.phoneInput.current.value !== "") { //  это условное выражение на JavaScript, которое проверяет, является ли текущее значение объекта phoneInput пустым. Если значение не пустое, то условие истинно и выполняется код внутри блока {}
 
      const itemText = this.phoneInput.current.value; // создает константную переменную с именем itemText и присваивает ей значение текущего значения объекта phoneInput. Объект phoneInput - это ссылка на элемент ввода HTML. Свойство current объекта phoneInput используется для получения текущего значения элемента ввода.
      this.phoneInput.current.value = ""; // устанавливает значение текущего элемента ввода phoneInput в пустую строку. Объект phoneInput - это ссылка на элемент ввода HTML, который был создан с использованием React. Свойство current объекта phoneInput используется для получения текущего значения элемента ввода.
    }
  }
  render() {
    return <div>
      <input ref={this.phoneInput} /> {/*Cоздает элемент ввода HTML. Атрибут ref используется для создания ссылки на элемент ввода HTML. Ссылка сохраняется в объекте phoneInput.*/}
      <button onClick={this.onClick.bind(this)}>Добавить</button> {/*код JavaScript, который связывает функцию onClick с текущим компонентом React.Функция bind используется для установки значения this внутри функции onClick.Значение this устанавливается на текущий компонент React.*/}
        </div>
  }
};
  
class PhoneItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      
    return <div>
                <p>
                    <b>{this.props.text}</b><br /> {/*Жирный*/}
                    <button onClick={() => this.props.deletePhone(this.props.text)}>Удалить</button> 
                </p>
            </div>
  }
};
  
class PhonesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
        {this.props.phones.map(item =>
          <PhoneItem key={item}
                    text={item}
                    deletePhone={this.props.deletePhone}/>
        )}
      </div>
  }
};
  
class AppView extends React.Component {
  
    render() {
        return <div>
            <PhoneForm addPhone={this.props.addPhone}/>
            <PhonesList {...this.props} />
    </div>
  }
};
  
function mapStateToProps(state) {
  return {
    phones: state.get("phones")
  };
}
  
module.exports = connect(mapStateToProps, actions)(AppView);