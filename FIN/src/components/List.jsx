const React = require("react");
const connect = require("react-redux").connect;
const {SUM_ADD} = require("../action/action.jsx");

const List = (props) => {
//   if (!props.newSum || !Array.isArray(props.newSum)) {
//     return null; 
//   }
// function getResult() {
//     return  (new Date() - new Date(data.date)) / 2600000000 * (Number(data.sumFullSalary) - Number(data.expense)) - Number(data.addExp);
// }

  return <>
      <table className="table">
          <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Дата</th>
                  <th scope="col">Сумма зарплаты</th>
                  <th scope="col">Сумма обязательных трат</th>
                  <th scope="col">Сумма траты</th>
                  <th scope="col">Итого</th>
                  <th scope="col"></th>
              </tr>
          </thead>
          <tbody>
              {props.newSum.map((item, index) => {
                      return  <tr key={item.id}>
                                  <th scope="row">{index+1}</th>
                                  <td>{item.date}</td>
                                  <td>{item.sumFullSalary}</td>
                                  <td>{item.expense}</td>
                                  <td>{item.addExp}</td>

                              </tr>
                  })
              }
              <tr>
                  <td colSpan="5" align="right">Итого:</td>
                  {/* <td align="right">{getResult()}</td> */}
                  <td></td>
              </tr>
          </tbody>
      </table>
  </>
}

const mapStateToProps = state => {
  return {
    newSum: state.sum.newSum, //product -  название reducer, описанного в /reducer/index.jsx, products - массив продуктов
  }
};

const mapDispatchToProps = dispatch => ({
    onSumAdd: (sum) => {
        dispatch({
            type: SUM_ADD, sum
        })
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(List);

// const React = require("react");
// const connect = require("react-redux").connect;

// const List = (props) => {
//   if (!props.newSum || !Array.isArray(props.newSum)) {
//     return null; // or handle the case when props.newSum is not an array
//   }

//   return (
//     <tbody>
//       {props.newSum.map((item, index) => (
//         <tr key={index}>
//           <td>{item.value}</td>
//         </tr>
//       ))}
//     </tbody>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     newSum: state.sum.newSum,
//   };
// };

// const mapDispatchToProps = {};

// module.exports = connect(mapStateToProps, mapDispatchToProps)(List);
