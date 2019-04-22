<template>
  <el-container class="main-container">
    <!-- 头部导航 -->
    <el-header v-if="user" height="78px">
      <div class="main-header">
        <!-- 头部左侧 -->
        <div>
         <!-- <div class="header-item" style="width: 202px; text-align: center;">
          </div>
          <div class="header-item on-focus" tabindex="0">
            <div class="header-item-btn">
            </div>
            <div class="header-item-content" id="allMenus">
              <div class="all-menus">
                <div class="all-menus-search">
                  <input type="search" placeholder="请输入关键字">
                  <button><i class="fas fa-search"></i></button>
                </div>
                <div class="all-menus-container">
                  <div class="all-menus-container-block">
                    <h3>用户管理</h3>
                    <ul>
                      <li>组织维护</li>
                      <li>员工维护</li>
                      <li>角色维护</li>
                      <li>用户维护</li>
                    </ul>
                  </div>
                  <div class="all-menus-container-block">
                    <h3>流程管理</h3>
                    <ul>
                      <li>流程列表</li>
                      <li>流程设置</li>
                      <li>添加流程</li>
                      <li>流程设置</li>
                      <li>添加流程</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>-->
        </div>
        <!-- 头部中间 -->
        <div>
          <v-menu :menus="$store.state.menus"/>
        </div>
        <!-- 头部右侧 -->
        <div>
          <div class="header-item on-hover">
            <div>登录</div>
            <div>注册</div>
          </div>
          <div class="header-item on-hover">
            <div class="header-item-btn">
              <img :src="user.avatar" :alt="user.name"/>
              {{ user.name }}
            </div>
            <div class="header-item-content" style="right: 0; width: 240px;">
              <div class="header-item-user-info">
                <div class="header-item-user-info-avatar">
                  <img :src="user.avatar" alt="Avatar">
                </div>
                <div class="header-item-user-info-list">
                  <p><b>{{ user.name }}</b></p>
                  <p><span @click="doLogout" style="cursor: pointer;"><i class="fas fa-sign-out-alt"></i> 登出</span></p>
                </div>
              </div>
              <div class="header-item-user-actions">
                <div>
                  <i class="fas fa-key"></i>
                  <p>修改密码</p>
                </div>
                <div>
                  <i class="fab fa-weixin"></i>
                  <p>微信绑定</p>
                </div>
                <div>
                  <i class="fab fa-weibo"></i>
                  <p>微信微博</p>
                </div>
                <div>
                  <i class="fas fa-globe-asia"></i>
                  <p>亚洲联通</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <!--标签栏 -->
      <!--<div class="main-tabs">-->
        <!--<div class="menu-toggler" :class="togglerClass" @click="togglerIsCollapse">-->
          <!--<i class="fas" :class="menuTogglerClass"></i>-->
        <!--</div>-->
        <!--<v-tabs/>-->
      <!--</div>-->
    </el-header>

    <el-container class="main-content">
       <!--左侧菜单 -->
      <!--<el-aside width="auto" class="scroll">-->
      <!--</el-aside>-->

      <!-- 主体内容 -->
      <el-main>
        <router-view/>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import VMenu from './VMenu'
import VTabs from './VTabs'
export default {
  name: 'Index',
  components: { VTabs, VMenu },
  computed: {
    menuTogglerClass () {
      return this.$store.state.menuCollapse ? 'fa-angle-double-right' : 'fa-angle-double-left'
    },
    togglerClass () {
      return this.$store.state.menuCollapse ? 'shrink' : 'spaead'
    },
    ...mapState(['user'])
  },
  methods: {
    togglerIsCollapse () {
      this.$store.commit('togglerMenuCollapse')
    },
    doLogout () {
      this.$store.dispatch('doUserLogout').then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  }
}
</script>

<style lang="scss">
.main-container {
  height: 100%;
  font-size: 13px;
  header {
    padding: 0;
    .main-header {
      color: white;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      height: 60px;
      line-height: 60px;
      &>div {
        display: flex;
      }
      .header-item {
        /*border-left: 1px solid #2a2f32;*/
        /*border-right: 1px solid #2a2f32;*/
        margin-left: -1px;
        position: relative;
        outline: none;
        &-btn {
          cursor: pointer;
          padding: 0 15px;
          &:hover {
            color: lightblue;
            background-color: #e5dede;
          }
          img {
            width: 36px;
            height: 36px;
            vertical-align: middle;
            border-radius: 50%;
            border: 1px solid #e5dede;
            margin-right: 10px;
          }
        }
        &-content {
          position: absolute;
          top: 48px;
          color: #e5dede;
          background-color: aliceblue;
          box-shadow: 0 1px 3px #e5dede;
          transition: opacity .15s, visibility 0s .15s;
          line-height: normal;
          z-index: 99;
          padding: 10px;
          display: none;
        }
        #allMenus {
          position: fixed;
          min-height: 360px;
          top: 48px;
          left: 0;
          right: 0;
          color: #e5dede;
          line-height: normal;
          background-color: white;
          box-shadow: 0 5px 7px #e5dede;
          z-index: 99;
        }
        &.on-focus:focus, &.on-focus:focus-within{
          .header-item-btn {
            background-color: #e5dede;
            color: #373d41;
          }
          .header-item-content {
            display: block;
          }
        }
        &.on-hover:hover .header-item-content {
          display: block;
        }
      }
    }
    .main-tabs {
      display: flex;
      flex-direction: row;
      .menu-toggler {
        height: 30px;
        color: #aeb9c2;
        background: #4a5064;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        cursor: pointer;
        flex-shrink: 0;
        &.spaead {
          width: 201px;
        }
        &.shrink {
          width: 64px;
        }
      }
    }
  }
  .main-content {
    overflow: auto;
    font-size: 12px;
    aside {
      background-color: #e5dede;
    }
  }
}
.all-menus {
  &-search {
    width: 40vw;
    min-width: 360px;
    display: flex;
    margin: 15px auto;
    flex-direction: row;
    border-bottom: 2px solid #e5dede;
    padding: 3px 10px;
    &:focus-within {
      border-bottom-color: #e5dede;
    }
    input {
      flex-grow: 1;
      font-size: 18px;
      border: none;
      outline: none;
    }
    button {
      width: 32px;
      height: 32px;
      font-size: 20px;
      background: transparent;
      cursor: pointer;
      border: none;
      outline: none;
    }
  }
  &-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 10px 20px;
    &-block {
      background-color: #e5dede;
      width: 240px;
      margin: 10px 5px;
      h3 {
        margin: 0;
        padding: 7px 10px;
        font-size: 12px;
        background-color: #e5dede;
      }
      ul {
        list-style: none;
        font-size: 12px;
        margin: 0;
        padding: 0;
        li {
          margin: 5px 0;
          padding: 4px 10px;
          cursor: pointer;
          &:hover {
            background-color: #e5dede;
          }
        }
      }
    }
  }
}
.header-item-user {
  &-info {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #e5dede;
    &-avatar {
      margin: 10px;
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    &-list {
      p {
        margin: 12px;
      }
    }
  }
  &-actions {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    justify-content: space-between;
    div {
      padding: 10px;
      margin: 5px 0;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: #e5dede;
      }
      i {
        font-size: 24px;
      }
      p {
        font-size: 12px;
        margin: 10px 0 0 0;
      }
    }
  }
}
</style>
