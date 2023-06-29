const React = require("react");
const connect = require("react-redux").connect;


const UserInfo = (props) => { //props.user

    return <>
        <div>
            Меня зовут {props.user.name}! Мне {props.user.age} лет.
        </div>
    </>
}

const mapStateToProps = state => {
    return {
        user: state.post.user //product -  название reducer, описанного в /reducer/index.jsx
    }
};

const mapDispatchToProps = dispatch => ({});

module.exports = connect(mapStateToProps, mapDispatchToProps)(UserInfo);