<template>
  <div>
    <div class="header">
      <img class="logo" src="../assets/artisan.jpg">
      <div class="title">
        <h1>{{ msg }}</h1>
        <h4 class="subtitle">{{ company }}</h4>
      </div>
    </div>

    <toast v-model="toast.show" :type="toast.type">{{ toast.text }}</toast>
    <div class="vote" v-for="(user,i) in userList">
      <sticky>
        <divider>{{user.id}}.{{user.name}}</divider>
      </sticky>
      
      <card>
        <img slot="header" src="../assets/artisan.jpg" style="width:100%;display:block;">
        <div slot="content" class="card-content">
          <p class="title">{{user.dpt}}</p>
          <p class="subtitle">{{user.attr}}</p>
          <p class="desc">{{user.desc}}
          </p>
          <x-switch style="margin-top:10px;" :inline-desc="maxnum+'/5'" :title="'投他一票'" v-model="valueList[i]" @on-change="checkMaxVotes(i)"></x-switch>
        </div>
      </card>
    </div>

    <div class="submit">
      <x-button :disabled="maxnum>5 || maxnum==0" @click.native="submit" type="primary">提交数据</x-button>
    </div>
  </div>

</template>

<script>
  import {
    Sticky,
    Group,
    Cell,
    Card,
    Divider,
    XSwitch,
    Toast,
    XButton
  } from 'vux'

  import userList from '../js/artisanList.js'

  export default {
    components: {
      Sticky,
      Group,
      Cell,
      Divider,
      Card,
      XSwitch,
      Toast,
      XButton,
    },
    data() {
      return {
        msg: '“中钞工匠”网络投票',
        company: '中国印钞造币总公司',
        valueList: [],
        selected: [],
        toast: {
          show: false,
          text: '',
          type: ''
        }
      }
    },
    computed: {
      userList() {
        return userList;
      },
      maxnum() {
        let count = this.valueList.filter(item => item);
        return count.length;
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
      checkMaxVotes(i) {
        if (this.maxnum > 5) {
          this.showToast({
            text: '请勿超过5票',
            type: 'warn'
          });
        }
      },
      submit() {
        this.showToast({
          text: '投票成功',
          type: 'success'
        });
      }
    },
    created() {
      this.valueList = userList.map(item => false);
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

  .card-content {
    margin: 15px 15px 20px 15px;
    .title {
      color: #444;
      font-size: 15px;
      font-weight: 500;
    }
    .subtitle {
      color: #666;
      font-size: 12px;
    }
    .desc {
      padding-top: 15px;
      font-size: 16px;
      line-height: 1.5em;
      text-indent: 2.3em;
      letter-spacing: 0.15em;
    }
  }

  .vote {
    margin-bottom: 25px;
    .vux-divider {
      font-size: 24px;
      color: #333;
      line-height:0;
      background:rgba(248,248,248,0.9);
      height:30px;
      display:flex;
      align-items:center;
    }
  }

  .submit {
    margin: 10px 15px 25px 15px;
  }

</style>
