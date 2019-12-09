<template>
  <div class="topbar">
    <div class="menu-btn">
      <i class="iconfont iconmenu topbar-icon"></i>
    </div>
    <div class="search-page" @click="goSearch">点击搜索...</div>
    <div class="side-bar"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goSearch(){
      this.$router.push({name: 'Search'});
    }
  }
};
</script>

<style lang="scss" scoped>
.topbar {
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  flex-wrap: nowrap;
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 150%);
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  &-icon {
    color: #fff;
    font-size: 2.5rem;
    margin-left: 1rem;
  }
  .search-page{
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      margin-left: 1rem;
      margin-right: 1rem;
      height: 80%;
      background-color: #fbc2eb;  
      border-radius: 2rem;
      color: #fff;
      font-size: .8rem;
      cursor: pointer;
  }
}
</style>