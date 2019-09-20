<template>
    <div  class="login-bg">
        <div class="form-wrap">
            <h2 class="login-h">
                xxxx后台管理系统  {{isLoading}}
            </h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item  prop="name">
                    <el-input
                            placeholder="admin"
                            prefix-icon="el-icon-share"
                            v-model="ruleForm.name">
                    </el-input>
                </el-form-item>

                <el-form-item  prop="pwd">
                    <el-input  type="password"
                            placeholder="123456"
                            prefix-icon="el-icon-star-off"
                            v-model="ruleForm.pwd">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button :loading="isLoading" class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    
</template>

<script>
    import {LoginIn} from '../../api/addr'
    import {keypressEnterSubmitForm ,getRulesListByLogin } from  './login'
    import {showLoading,hideLoading} from "../../utils/commonUtil";
    export default {
        name: "login",
        created: function () {
            keypressEnterSubmitForm(this.submitForm);
        },
        data() {
            return {
                isLoading:false,
                ruleForm: {
                    name: '',
                    pwd: ''
                },
                rules:getRulesListByLogin()
            };
        },
        methods: {
            async loginIn(params) {
                showLoading (this);
                try {
                    await LoginIn({name: params.name, pwd: params.pwd})
                    hideLoading (this);
                    this.$cookies.set('isLogin', 'true', 60 * 60 * 24 * 7)
                    this.$router.push({path: '/'})
                } catch (e) {
                    hideLoading (this);

                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loginIn(this.ruleForm)
                    } else {
                        this.$message({
                            message: '输入框不能为空',
                            type: 'error'
                        });

                    }
                });
            },

        }
    };
</script>

<style scoped>
    .login-btn{
        width: 100%;
    }
.login-bg {
    background-color: #2f3a4c;
    height: 100vh;
    text-align: center;
}
    .form-wrap{
        display: inline-block;
        max-width: 500px;
        margin-top: 200px;
        text-align: left;
    }
    .login-h{
        color: #fff;
        font-size: 24px;
    }
</style>
