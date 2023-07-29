const React = require("react");
const connect = require("react-redux").connect;
const {SUM_ADD} = require("../action/action.jsx");

const List = (props) => {
//   if (!props.newSum || !Array.isArray(props.newSum)) {
//     return null; 
// //   }

const calculateTotalAddExp = () => {
    let total = 0;
    props.newSum.forEach((item) => {
      total += Number(item.addExp);
    });
    return total;
  };

  const getResult = (date, sumFullSalary, expense) => {
    return (
      (new Date() - new Date(date)) / 2600000000 *
      (Number(sumFullSalary) - Number(expense)) -
      calculateTotalAddExp()
    );
}



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
                  <td align="right">{calculateTotalAddExp().toString()}</td>
                  <td></td>
              </tr> 
          </tbody>
      </table>
      <div className="getResult">
  <h3>Отклонение от нормы:</h3>
  {props.newSum.map((item) => (
    <h4>
    {getResult(item.date, item.sumFullSalary, item.expense).toFixed(2) < 0 ? (
      <h4 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {getResult(item.date, item.sumFullSalary, item.expense).toFixed(2)} Руб.
      
      <br /><span style={{ color: "red" }}> Живёшь не по финансам, больше экономь!</span>
    </h4>
    ) : (
      getResult(item.date, item.sumFullSalary, item.expense).toFixed(2)
    )}{" "}
    Руб.
  </h4>

  ))}
</div>
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