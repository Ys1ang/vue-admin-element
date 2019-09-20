<template>
 <div>
     <el-container style="height: 100vh; border: 1px solid #eee">
         <el-header style="text-align: right">

             <span> xxx 欢迎您 </span>
             <el-button  type="danger" plain>退出</el-button>

         </el-header>
         <el-container>
             <el-aside width="200px">
                 <el-menu :default-openeds="['1', '3']"  :router="true"  :default-active="$route.path" >
                     <el-submenu index="1">
                         <template slot="title"><i class="el-icon-message"></i>banner管理</template>
                         <el-menu-item-group>
                             <template slot="title">banner管理</template>
                             <el-menu-item  route="/articles"    index="/articles">bannner管理</el-menu-item>
                         </el-menu-item-group>
                     </el-submenu>

                 </el-menu>
             </el-aside>
             <el-main style="">
                 <router-view></router-view>
             </el-main>
         </el-container>
     </el-container>

 </div>



</template>


<style>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }


    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data: function() {
    return {
      visible: 'false',
      aa:1,
        defaultUrl:'/articles'
    }
  },
  components: {
    HelloWorld
  },
  created() {
  },
  methods:{

  }
}
</script>
