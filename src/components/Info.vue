<template>
  <div>
    <div class="header">
      <img class="logo" src="../assets/artisan.jpg">

      <div class="title">
        <h1>{{ msg }}</h1>
        <h4 class="subtitle">{{ company }}</h4>
      </div>
    </div>

    <div class="content">
      <p class="info">个人信息</p>
      <p class="desc">本页面并非必填信息，仅用于活动结束抽奖时邮寄奖品，同时我们承诺不会将该信息用于其它用途。</p>
    </div>

    <group label-width="4.5em" label-margin-right="2em" label-align="right">
      <x-input title="姓名" v-model="user" placeholder="请填写收件人姓名" :required="true" :show-clear="true"></x-input>
      <x-input title="手机号" is-type="china-mobile" v-model="mobile" :show-clear="true" :required="true" placeholder="请输入手机号"></x-input>
      <x-address title="地址选择" v-model="address" raw-value :list="addressData" :required="true" value-text-align="left"></x-address>
      <x-textarea title="详细地址" placeholder="请填写详细地址" v-model="detail" :required="true" :show-counter="false" :show-clear="true" :rows="3"></x-textarea>
    </group>
    <toast v-model="toast.show" :type="toast.type">{{toast.text}}</toast>

    <div class="submit">
      <x-button @click.native="submit" type="primary">提交数据</x-button>
    </div>

  </div>
</template>

<script>
  import {
    Toast,
    XTextarea,
    XAddress, 
    ChinaAddressV3Data,
    XButton,
    Group,
    Cell,
    XInput,
    PopupPicker,
    Picker
  } from 'vux'

  export default {
    components: {
      Cell,
      Toast,
      XButton,
      Group,
      XAddress,
      XTextarea,
      XInput,
      PopupPicker,
      Picker
    },
    data() {
      return {
        msg: '“中钞工匠”网络投票',
        company: '中国印钞造币总公司',
        addressData: ChinaAddressV3Data,
        toast: {
          show: false,
          text: '',
          type: ''
        },
        user: '',
        mobile: '',
        detail: '',
        address: ['北京市', '市辖区', '东城区']
      }
    },
    methods: {
      showToast(settings) {
        this.toast.text = settings.text;
        this.toast.type = settings.type;
        this.toast.show = true;
        setTimeout(() => {
          this.toast.show = false;
        }, 1500);
      },
      submit() {
        this.showToast({
          text: '投票成功',
          type: 'success'
        });
        console.log(this.user);
        console.log(this.mobile);
        console.log(this.detail);
      }
    }
  }

</script>

<style scoped lang="less">
  .header {
    text-align: center;
    .title {
      font-weight: 100;
      margin-top: -120px;
      color: #fff;
      margin-bottom: 30px;
      .subtitle {
        padding-top: 10px;
      }
    }
    .logo {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    padding: 15px;
    padding-top:10px;
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

  .vote {
    margin-bottom: 25px;
    .vux-divider {
      font-size: 24px;
      color: #333;
    }
  }

  .submit {
    margin: 10px 15px 25px 15px;
  }

</style>
