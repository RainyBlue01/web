<template>
  <div class="error-page">
    <div class="error-page-container">
      <h1>!404 页面不存在</h1>
      <div>
        <p>您访问的页面不存在。</p>
        <p>
          [<a href="javascript: history.back()">返回上一页</a>]
          [<router-link :to="{ name: 'Home' }">返回首页</router-link>]
        </p>
      </div>
    </div>
  </div>
</template>
