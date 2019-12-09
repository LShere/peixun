<template>
  <div id="app">
    <Loading v-show="Loading"></Loading>
      <transition :name='direction'>
      <keep-alive>
          <router-view class="app-view" />
          

      </keep-alive>
      </transition>
    <Seize></Seize>
    <Tabbar :showTab='isShow'></Tabbar>
  </div>
</template>
  <script>
  import { mapState } from 'vuex'
  
  import Loading from '@/components/Loading'
  import Tabbar from '@/components/Tabbar'
  import Seize from '@/components/Seize'
  export default {
    data() {
      return {
        isShow: true,
        showHeight: 0,
        docHeight: 0,
        direction: 'slide-right'
      }
    },
    mounted(){

      this.docHeight = document.documentElement.clientHeight;
      this.showHeight = document.documentElement.clientHeight;
      console.log(this.docHeight, this.showHeight);
      window.onresize = () => {
        this.showHeight = document.body.clientHeight;
        console.log(this.showHeight, this.docHeight);
      }
    },
    computed:{
      ...mapState('base',[
        'Loading'
      ])
    },
    watch:{
      //监控路由
      $route(to, from){
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        if(to.path == '/'){
          this.direction = 'slide-right';
        }else if(from.path == '/'){
          this.direction = 'slide-left';
        }else{
          this.direction = toDepth > fromDepth ? 'slide-left' : 'slide-right';
        }
      },
      showHeight(){
        console.log('watching');
        this.docHeight > this.showHeight ? this.isShow = false : this.isShow = true;
      },
    },
    components:{
      Loading,
      Tabbar,
      Seize
      // Topbar
    },
    
  }
  </script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  html, body, #app{
    height: 100%;
  }
  /* 去除滚动条 */
::-webkit-scrollbar{
    display:none;
}
/* 路由跳转样式 */
.app-view{
  width: 100%;
}
.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%)
}

.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translateX(-100%)
}

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
  transition: 0.5s;
  position: absolute;
  top:0;
}
</style>
