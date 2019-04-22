<template>
  <div>
    <el-menu
      mode="horizontal"
      :collapse="$store.state.menuCollapse"
      :collapse-transition="false"
      class="el-menu-vertical"
      :router="true"
      :default-active="$route.path"
      style="border: none;">
      <VMenuItem v-for="menu in menus" :key="menu.name" :menu="menu"/>
    </el-menu>
  </div>
</template>

<script>
import VMenuItem from './VMenuItem'
export default {
  name: 'VMenu',
  components: { VMenuItem },
  props: {
    menus: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
  .el-menu .fas, .el-menu .fab {
    text-align: center;
    width: 23px;
    font-size: 18px;
    height: 48px;
    margin-right: 7px;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
  }
</style>
