
//校验小项 最后拼成大项。有益于相关校验规则积累





export const  showLoading  = ( This ) => {
    This.$store.commit('showLoading');
};
export const  hideLoading  = ( This ) => {
    This.$store.commit('hideLoading');
};


//timestampToTime 时间戳13位转换
export  const  timestampToTime = (timestamp) => {
    let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y+M+D+h+m+s ;
}
