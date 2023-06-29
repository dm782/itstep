const React = require("react");
const connect = require("react-redux").connect;
const actions = require("./actions.jsx");
  
function PhoneForm(props){
  let phoneInput = React.createRef();
  
  function handleButtonClick() {
    if (phoneInput.current.value !== "") {
 
      const itemText = phoneInput.current.value;
      phoneInput.current.value ="";
      return props.onAddPhone(itemText);
    }
  }


    return <div>
            <input ref={this.phoneInput} />
            <button onClick={handleButtonClick}>Добавить</button>
        </div>

};
  
class PhoneItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      
    return <div>
                <p>
                    <b>{this.props.text}</b><br />
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
  
function AppView(props) {
        return <div>
            <PhoneForm onAddPhone={props.addPhone}/>
            <PhonesList {...props} />
        </div>

};
  
function mapStateToProps(state) {
  return {
    phones: state.get("phones")
  };
}
  
module.exports = connect(mapStateToProps, actions)(AppView);