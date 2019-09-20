
//校验小项 最后拼成大项。有益于相关校验规则积累



//输入框必填
export const  required = (msg) =>{
    return  {required: true, message: msg, trigger: 'change'};
}




export const  concatRulesList  = ( ... item ) => {
  let arr = [];
    item.forEach(function (i) {
        arr.push(i);
    } )
    return arr;
}
