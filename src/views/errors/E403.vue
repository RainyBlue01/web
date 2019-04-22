<template>
  <div class="error-page">
    <div class="error-page-container">
      <h1>!403 没有权限</h1>
      <div>
        <p>您没有权限访问本页面，如有疑问请联系系统管理员。</p>
        <p>[<router-link :to="{ name: 'Home' }">返回首页</router-link>]</p>
      </div>
    </div>
  </div>
</template>
