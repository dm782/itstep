const React = require("react");

const UserInfo = (props) => { //props.user

    return <>
        <div>
            Меня зовут {props.user.name}! Мне {props.user.age} лет. И это мой блог!
        </div>
    </>
}


module.exports = UserInfo;