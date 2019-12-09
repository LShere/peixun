<template>
  <div class="cm-topbar">
    <div class="cm-back">
      <i class="iconfont iconback back-icon" @click="goBack"></i>
    </div>
    <div class="cm-title">{{title}}</div>
  </div>
</template>

<script>
export default {
    props:['title'],
  data() {
    return {
    };
  },
  methods:{
      goBack(){
          this.$router.go(-1);
      }
  }
};
</script>

<style lang="scss" scoped>
.cm-topbar {
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 150%);
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  color: #fff;
  .cm-back {
      position: absolute;
      margin-left: 1rem;
    .back-icon {
      font-size: 1.5rem;
    }
  }
  .cm-title{
      text-align: center;
      flex: 1;
  }
}
</style>