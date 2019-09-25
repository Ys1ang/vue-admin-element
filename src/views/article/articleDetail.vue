<template>
    <div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form-search">
            <el-form-item label="标题名称" prop="title">
                <el-input v-model="ruleForm.title" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择banner类型"    value="" :disabled="isEdit">
                    <el-option v-for="(item,index) in bannerTypeList" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="说明" prop="content">
                <el-input v-model="ruleForm.content" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="跳转链接" prop="url">
                <el-input v-model="ruleForm.url" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="配图" prop="img" >
                <el-upload :disabled="isEdit"
                        action="/a/u/img/img"
                        list-type="picture-card"
                        :limit="1"


                        :file-list="uploadList"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="ruleForm.img" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="changeArticle(isEdit)">{{isEdit?'编辑':'查看'}}</el-button>
                <el-button @click="back()">取消</el-button>
                {{this.isEdit}}

            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import  {showLoading,hideLoading} from '../../utils/commonUtil'
    import {getArticleById} from '../../api/addr'
    import {bannerType} from  '../../const/const.js'
    import {getRulesListByAddArticle,Form} from "../addArticle/addArticle";


    export default {
        name: "articleDetail",
        data() {
            return {
                res:'',
                uploadList:[],
                isEdit:false,
                bannerTypeList:'',
                dialogVisible: false,
                ruleForm:Form,
                rules:getRulesListByAddArticle(),
            };
        },

        created () {
            this.bannerTypeList = bannerType;

            console.log(this.$route.params.id)

             this.getArticleById (this.$route.params.id)


        },
        methods: {


            async getArticleById(id) {
                showLoading (this);
                try {
                    let res =  await  getArticleById(id);
                    this.res = res.data.article;

                    this.ruleForm={
                        title:this.res.title,
                        content:this.res.content,
                        type:this.bannerTypeList[this.res.type],
                        url:this.res.url,
                        img:this.res.img
                    };
                    this.uploadList.push({
                        url:this.res.img
                    })

                    if(this.res.status===2){
                        this.isEdit =true;
                    }

                    console.log(this.res)
                    hideLoading (this);
                } catch (e) {
                    hideLoading (this);
                }

            },




            changeArticle(status) {
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        console.log(this.ruleForm)
                        // this.addArticle(this.ruleForm)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            back() {
                this.$router.push({
                    path:'/articles'
                })
            },
            handleAvatarSuccess(res, file) {
                this.ruleForm.img='';
                this.ruleForm.img = res.data.url;

            },
            beforeAvatarUpload(file) {
                console.log(1)

                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!(isJPG || isPNG)) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return (isJPG || isPNG) && isLt2M;
            },

            handleRemove(file, fileList) {
                    this.ruleForm.img='';
                this.uploadList=[];
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
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


    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>
