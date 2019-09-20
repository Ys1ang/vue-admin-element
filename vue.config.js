// module.exports = {
//   devServer: {
//     proxy: {
//       '/a': {
//         target: 'http://dev.admin.carrots.ptteng.com/',//目标地址
//         ws: true, //// 是否启用websockets
//         changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
//         pathRewrite: {'^/a': '/'}    //这里重写路径
//       }
//
//     }
//   }
// }


module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      "/a": {
        target: "http://dev.admin.carrots.ptteng.com/", // 域名
        ws: true, // 是否启用websockets
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRequiresRewrite: {
          "^/a": "/"
        }
      }
    }
  }
}



// module.exports = {
//   devServer: {
//     port: 8080,//设置默认端口
//     proxy: { //设置代理
//       '/api': {
//         target: 'http://dev.admin.carrots.ptteng.com/',
//         ws: true,// 如果要代理 websockets
//         changeOrigin: true,// 将主机标头的原点更改为目标URL
//         pathRewrite: {'^/a': '/'}
//       }
//     }
//   }
// }
