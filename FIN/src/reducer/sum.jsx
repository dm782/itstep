const reducer = (state = {}, action) => {

    switch(action.type){
        case "INIT":
            return {...state,
                newSum: action.newSum,                
            }
        case "SUM_ADD":
            let newSum  = {               
                date: action.sum.date,
                sumFullSalary: action.sum.sumFullSalary,
                expense: action.sum.expense,
                addExp: action.sum.addExp,
            };
            return {...state, 
                    newSum: [...state.sum, newSum], 
                    }; 
        case "LAST_DELETE":
            break;
    }
    return state;
}
module.exports = reducer;