import  request from '../plugins/axios/Re-axios'

export const  LoginIn = (params) =>{
    return request('post','a/login',params)
};


export const  getArticleLists = (params) =>{
    return request('get','/a/article/search',params)
};

//新增article

export const  addArticle = (params) =>{
    return request('post','/a/u/article',params)
};


export const  getArticleById = (id) =>{
    return request('get','/a/article/'+id)
};
