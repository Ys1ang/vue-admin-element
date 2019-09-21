import {required,concatRulesList} from  '../../utils/rulesUtil'

 export  const Form =  {
     name: '',
     type: '',
     content: '',
     url:'',
     img:''
 }


export const getRulesListByAddArticle  = () => {
    let obj = {};
    obj['title'] = concatRulesList(required('请输入名称'));
    obj['type'] = concatRulesList(required('请选择类型'));
    obj['img'] = concatRulesList(required('请上传图片'));
    obj['content'] = concatRulesList(required('请输入说明'));
    obj['url'] = concatRulesList(required('请输入链接'));
    return obj ;
}
