<template>
  <div>
    <x-header></x-header>
    <toast v-model="toast.show" :type="toast.type">{{ toast.text }}</toast>
    <div class="vote" v-for="(user,i) in userList" :key="i">
      <sticky :check-sticky-support="false">
        <divider>{{user.id}}.{{user.name}}</divider>
      </sticky>

      <card>
        <img slot="header" :src="`./static/img/${user.id}.jpg`" style="width:100%;display:block;">
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
      <x-button :disabled="maxnum!=5" @click.native="submit" type="primary">提交数据</x-button>
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
} from "vux";

import XHeader from "./Header";
import userList from "../js/artisanList";
import util from "../js/common";
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
    XHeader
  },
  data() {
    return {
      valueList: [],
      toast: {
        show: false,
        text: "",
        type: ""
      },
      voteNum: [],
      userList
    };
  },
  computed: {
    // userList() {
    //   return userList;
    // },
    maxnum() {
      let count = this.valueList.filter(item => item);
      return count.length;
    },
    openid() {
      return util.getUrlParam("openid");
    },
    token() {
      return util.getUrlParam("token");
    },
    signature() {
      return util.getUrlParam("signature");
    },
    time() {
      return util.getUrlParam("timestamp");
    },
    from() {
      return util.getUrlParam("from");
    },
    curTimeStamp() {
      return (new Date().getTime() / 1000).toFixed(0);
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
          text: "请勿超过5票",
          type: "warn"
        });
      }
    },
    submit() {
      let artisanList = [];
      let now = util.getNow();
      let addStr = [];
      this.valueList.forEach((item, i) => {
        if (item) {
          artisanList.push(`('${this.token}','${this.openid}',${i},'${now}')`);
          addStr.push(i);
        }
      });

      let params = {
        openid: this.openid,
        token: this.token,
        valstr: artisanList.join(","),
        addstr: addStr.join(","),
        timestamp: this.time,
        signature: this.signature
      };

      let url =
        "//cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/addArtisanInfo";
      this.$http
        .jsonp(url, {
          params
        })
        .then(res => {
          if (!res.ok) {
            this.showToast({
              text: "数据提交失败",
              type: "warn"
            });
            return;
          }
          var data = res.data;
          if (data.status > "0") {
            this.showToast({
              text: data.title,
              type: "success"
            });
            // 跳转提交用户信息
            setTimeout(() => {
              this.$router.push("/info");
            }, 500);
          } else {
            this.showToast({
              text: data.title,
              type: "warn"
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getStep() {
      let url =
        "//cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/isSetUserInfo";
      let params = {
        openid: this.openid,
        token: this.token
      };
      this.$http
        .jsonp(url, {
          params
        })
        .then(res => {
          var data = res.data;
          if (data.status >= 1) {
            this.$router.push("/info");
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    // 有效期过期，重新发送
    // console.log(this.curTimeStamp, this.time);

    // console.log(this.signature);
    if (
      this.curTimeStamp - this.time > 600 ||
      this.curTimeStamp == null ||
      this.signature == null
    ) {
      this.userList = [];
      this.$router.push("/message");
      return;
    }
    //
    if (
      this.token == null ||
      this.openid == null ||
      !util.isWeiXin() ||
      this.from != null
    ) {
      this.$router.push("/follow");
      return;
    }
    this.getStep();
    this.valueList = userList.map(item => false);
  }
};
</script>

<style scoped lang="less">
.card-content {
  margin: 15px 15px 20px 15px;
  .title {
    color: #444;
    font-size: 16px;
    font-weight: 500;
  }
  .subtitle {
    color: #666;
    font-size: 13px;
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
    line-height: 0;
    background: rgba(248, 248, 248, 0.9);
    height: 30px;
    display: flex;
    align-items: center;
  }
}

.submit {
  margin: 10px 15px 25px 15px;
}
</style>
