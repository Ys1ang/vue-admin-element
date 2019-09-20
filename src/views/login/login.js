

import {required,concatRulesList} from  '../../utils/rulesUtil'
// 全局回车事件

export const  keypressEnterSubmitForm = (submit) =>{
    document.onkeypress = function(e) {
        let keycode = document.all ? event.keyCode : e.which;
        if (keycode == 13) {
            submit('ruleForm');
            return false;
        }
    };
}
export const getRulesListByLogin  = () => {
    let obj = {};
     obj['name'] = concatRulesList(required('请输入账号'));
     obj['pwd'] = concatRulesList(required('请输入密码'));
    return obj ;
}

