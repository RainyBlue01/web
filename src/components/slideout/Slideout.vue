<template>
  <div class="slide" :style="{zIndex, left: $store.state.menuCollapse ? '64px' : '200px'}">
    <div class="slide-bg" @click="maskClick"></div>
    <div class="slide-container" :style="{width: containerWith, left: 'auto'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slideout',
  props: {
    zIndex: {
      type: Number,
      default: 999
    },
    width: {
      type: [Number, String],
      default: '90%'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    containerWith () {
      if (this.width === null || typeof this.width === 'undefined') return '90%'

      if (!isNaN(this.width)) return this.width + 'px'
      return toString.call(this.width) === '[object String]' ? this.width : '90%'
    }
  },
  methods: {
    maskClick () {
      this.$emit('mask')
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  position: fixed;
  top: 78px;
  right: 0;
  bottom: 0;
  overflow: hidden;
  &-bg {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.6;
  }
  &-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: #F9F9F9;
  }
}
</style>
