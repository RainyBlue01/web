<template>
  <div class="tabsbar">
    <div class="tabsbar-left ctrl-btn" @click="tabbarScrollLeft(360)"><i class="fas fa-angle-left"></i></div>
    <div ref="tabBarBox" class="tabsbar-box">
      <div class="tabsbar-box-items">
        <div v-for="r in openTabs" :key="r.name" :class="{active: r.path === $route.path}" @click="activeRoute(r)">
          {{ r.meta.title }}
          <i class="fas fa-times-circle" v-if="r.name !== 'Home'" @click.stop="closeRoute(r)"></i>
        </div>
      </div>
    </div>
    <div class="tabsbar-right ctrl-btn" @click="tabbarScrollLeft(-360)"><i class="fas fa-angle-right"></i></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'VTabs',
  computed: {
    ...mapState(['openTabs'])
  },
  methods: {
    activeRoute (route) {
      if (route.name !== this.$route.name) {
        let obj = {}
        obj.name = route.name
        if (route.params) {
          obj.params = route.params
        }
        if (route.query) {
          obj.query = route.query
        }
        this.$router.push(obj)
      }
    },
    closeRoute (route) {
      let r = null
      if (route.name === this.$route.name) {
        let index = this.openTabs.indexOf(route)
        if (index > 0) {
          r = this.openTabs[index - 1]
        } else if (this.openTabs.length > (index + 1)) {
          r = this.openTabs[index + 1]
        } else {
          r = { name: 'Home' }
        }
      }
      this.$store.commit('closeRoute', route)
      if (r) {
        this.activeRoute(r)
      }
    },
    tabbarScrollLeft (left = 0) {
      this.$refs.tabBarBox.scrollLeft += left
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabsbar {
    flex-grow: 1;
    position: relative;
    border-bottom: 1px solid #2a2f32;
    & > div {
      position: absolute;
      top: 0;
    }
    .ctrl-btn {
      width: 15px;
      text-align: center;
      line-height: 22px;
      font-size: 16px;
      margin: 1px 0 1px 0;
      background: darkslategrey;
      color: white;
      cursor: pointer;
      bottom: 0;
    }
    &-left {
      left: 0;
      border-left: none;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &-right {
      right: 0;
      border-right: none;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &-box {
      left: 20px;
      right: 20px;
      bottom: -1px;
      overflow: hidden;
      &-items {
        display: flex;
        flex-direction: row;
        & > div {
          height: 29px;
          padding: 3px 20px;
          margin: 1px 0 -1px 1px;
          color: white;
          background: #4a5064;
          border: 1px solid #2a2f32;
          cursor: pointer;
          position: relative;
          white-space: nowrap;
          &:hover{
            background-color: darkslategrey;
            & i {
              display: block;
            }
          }
          &.active {
            color: black;
            background-color: white;
            border-bottom-color: white;
            & i {
              color: #2a2f32;
            }
          }
          & i {
            position: absolute;
            top: 6px;
            right: 3px;
            display: none;
          }
        }
      }
    }
  }
</style>
