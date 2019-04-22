<template>
  <div class="home">

  </div>
</template>

<script>
  import {getcodeList} from '@/api/roodbook'

  export default {
    name: 'home',
    data() {
      return {
        slideVisible: false
      }
    },
    created() {
      let params = 1
      getcodeList(params)
    }
  }
</script>
