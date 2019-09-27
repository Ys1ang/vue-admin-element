<template>

    <div>


        <el-form :inline="true" :model="formInline" class="form-search">
            <el-form-item label="标题">
                <el-input v-model="formInline.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.status" placeholder="请选择状态">
                    <el-option label="上架" value="2"></el-option>
                    <el-option label="下架" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="formInline.type" placeholder="请选择类型">
                    <el-option label="首页banner" value="0"></el-option>
                    <el-option label="找职位banner" value="1"></el-option>
                    <el-option label="找精英banner" value="2"></el-option>
                    <el-option label="行业大图" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
                <div class="block">
                    <el-date-picker
                            v-model="formInline.date"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <div style="text-align: right">
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="info" @click="reset">重置</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div style="text-align: right;padding:10px 20px">


            <router-link to="/addArticle" tag="el-button" type="primary" class="el-button--primary">
                新增
            </router-link>

        </div>

        <el-table
                :data="res"
                style="width: 100%;text-align: center ; border: 1px solid #efefef;border-radius: 3px"
                max-height="600px">
            <el-table-column
                    fixed
                    prop="id"
                    label="序号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="img"
                    label="图片"
                    width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.img" width="150" class="head_pic"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题"
                    width="320">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="类型"
                    :formatter = 'filterType'
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="createAt"
                    label="创建时间"
                    :formatter = 'timestampToTime'
                    width="200">



            </el-table-column>
            <el-table-column
                    prop="updateAt"
                    label="修改时间"
                    :formatter = 'timestampToTime'
                    width="200">
            </el-table-column>

            <el-table-column
                    prop="status"
                    label="状态"
                    :formatter = 'filterStatus'
                    width="120">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="240">
                <template slot-scope="scope">

                    <el-button @click="update(scope.row)"  :type="scope.row.status==1?'success':'danger'" size="small">{{scope.row.status==1?'上架':'下架'}}</el-button>
                    <router-link :to="{name:'Article',params:{id:scope.row.id }}" tag="el-button" type="primary" class="el-button el-button--text el-button--small">
                        查看
                    </router-link>
                    <el-button type="text" size="small">编辑</el-button>
                    <el-button @click="deleteArt(scope.row)"    :disabled="scope.row.status==2"  type="danger" size="small">删除</el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination   style="text-align: right;margin-top: 20px"
                background
                layout="prev, pager, next"
                @current-change ='changePage'
                :current-page="page"
                :total="total">
        </el-pagination>
    </div>

</template>

<script>

    import  {showLoading,hideLoading,timestampToTime} from '../../utils/commonUtil'
    import {updateArticleStatus,getArticleLists,deleteArticle}  from '../../api/addr'
    import {bannerType,bannerStatus} from  '../../const/const.js'


    export default {
        name: "articles",
        data() {
            return {
                res:[],
                total:0,
                page:1,
                params:{},
                formInline: {
                    title: '',
                    status: '',
                    type: '',
                    date:[],

        }
            }
        },
        created  () {
            this.initSearchData();
            this.getArticleList(this.$route.query);
        },
        watch: {
            $route: {
                handler(val, oldVal){
                    this.getArticleList(val.query);
                },
                deep:true
            }
        },
        methods: {

            deleteArt : function (deleteObj) {


                console.log(deleteObj)

                let deleteMsg= '确定删除架该项吗？';
                this.$confirm(deleteMsg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteArticle (deleteObj.id)
                })
            },


            update : function (updateObj) {
                let updateMsg= updateObj.status==1?'确定上架该项吗？' : '确定下架该项吗？';
                this.$confirm(updateMsg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.updateArticleBystatus ({id:updateObj.id,status:updateObj.status==1?2:1})
                })
            },



            timestampToTime : function (val,row) {
                 return timestampToTime(val[row.property])
            },
            filterType :  function (val,row) {
                return  bannerType[val[row.property]];
            },

            filterStatus :  function (val,row) {
                return  bannerStatus[val[row.property]];
            },
            changePage : function(page) {
                let params = JSON.parse(JSON.stringify(this.$route.query));
                params.page = page;
                this.$router.push({
                    path:this.$route.path,
                    query:params
                })
            },


            initSearchData  () {
                this.formInline=this.$route.query;
                let startAt = !this.$route.query.startAt?'':  new Date( Number(this.$route.query.startAt));
                let endAt = !this.$route.query.endAt?'':  new Date( Number(this.$route.query.endAt));
                // this.formInline.date='';
                if((startAt&& startAt)){
                    this.formInline.date=[startAt ,endAt];
                }

            },




            async deleteArticle(params) {
                showLoading (this);
                try {
                    let res = await deleteArticle(params);
                    this.$message.success(res.message);
                    this.onSubmit()
                    hideLoading (this);
                } catch (e) {
                    hideLoading (this);
                }
            },




            async updateArticleBystatus(params) {
                showLoading (this);

                try {
                    let res = await updateArticleStatus(params);
                   this.$message.success(res.message);
                   this.onSubmit()
                    hideLoading (this);
                } catch (e) {
                    hideLoading (this);
                }
            },

            async getArticleList(query) {
                showLoading (this);
                try {
                     let res =  await getArticleLists(query);
                     this.res = res.data.articleList;
                     this.total = res.data.total;
                     this.page = Math.ceil(res.data.size/res.data.total);
                    hideLoading (this);
                } catch (e) {
                    hideLoading (this);
                }
            },

            onSubmit() {
                let params = JSON.parse(JSON.stringify(this.formInline))
                params.startAt = params.date ? new Date(params.date[0]).getTime() :'';
                params.endAt =  params.date ? new Date(params.date[1]).getTime():'';
                params.t= new Date().getTime();
                params.page=1;
                delete  params.date;

                console.log(params)
                this.$router.push({
                    path:this.$route.path,
                    query:params
                })
            },
            reset(){
                for (let key in this.formInline) {
                    this.formInline[key]=''
                };
                this.page=1;
                this.$router.push({
                    path:this.$route.path,
                    query:''
                })
            }
        }
    }
</script>
+

<style scoped>
    .form-search{
        text-align: left;
        padding:  20px 20px 0;
        border: 1px solid #efefef;
        border-radius: 5px;
    }

</style>
