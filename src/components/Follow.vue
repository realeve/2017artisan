<template>
  <div>
    <x-header></x-header>
    <div class="content">
      <p class="info"> 链接无效 </p>
      <p class="desc"> 请长按以下二维码关注中国印钞造币后开始投票 </p>
    </div>
    <img src="../assets/qrcode.jpg" style="width:100%;display:block;">
  </div>
</template>

<script>
  import XHeader from './Header'

  export default {
    components: {
      XHeader
    }
  }

</script>

<style scoped lang="less">
  .content {
    padding: 15px;
    padding-top: 10px;
    .info {
      display: flex;
      justify-content: center;
      font-size: 20px;
      width: 100%;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    .desc {
      padding-top: 5px;
      color: #636563;
      font-size: 14px;
      text-indent: 2em;
    }
  }

</style>
