<template>
  <div class="login-container">
    <div class="login-block">
      <h5>用户登录</h5>
      <div class="login-block-info">
        <el-form ref="loginForm" :rules="loginDataRule" :model="loginData" size="small"
                 @keypress.native.enter="doLogin">
          <el-form-item prop="username">
            <el-input v-model="loginData.username" placeholder="请输入帐号">
              <template slot="prepend"><i class="fas fa-user"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginData.password" placeholder="请输入密码" type="password">
              <i slot="prepend" class="fas fa-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item align="right">
            <el-button type="primary" @click="doLogin">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        loginData: {
          username: '',
          password: ''
        },
        loginDataRule: {
          username: [
            {required: true, message: '请输入登录帐号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      doLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('doUserLogin', this.loginData).then(() => {
              this.$router.push({name: 'addgoods'})
            }).catch(e => {
              this.$message({showClose: true, message: e.message, type: 'error'})
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    width: 100%;
    height: 100%;
    background-size: cover;
    background: url('http://news.mydrivers.com/Img/20120217/2012021709492293.jpg') center no-repeat;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    .login-block {
      width: 320px;
      border-radius: 10px;
      background-color: #FFFFFF99;
      margin-right: 10vw;
      font-size: 18px;

      h5 {
        padding: 0 20px 10px;
        border-bottom: 1px solid #aaa;
      }

      &-info {
        padding: 0 20px;
        font-size: 18px;
      }
    }
  }
</style>
