<template>
  <div class="">
    <Topbar></Topbar>
    <div class="home">
      <div class="home-tabbar"  :class="{'isFixed': isFixed}">
        <div class="home-tabbar-intheater" :class="{'tab-active': isActive}" @click="getInTheaterInfo()">{{tabbarInfo[0]}}</div>
        <div class="home-tabbar-comming" :class="{'tab-active': !isActive}" @click="getCommingInfo()">{{tabbarInfo[1]}}</div>
      </div>
      <div class="home-content">
        <div class="movie-content" v-if="currList.length > 0">
          <ul class="movie-list">
            <li class="movie-item" v-for="(item, index) in currList" :key="index" @click="goDetail(item.id)">
              <img :src="item.images.small" alt="链接失效" width="100%">
              <div class="movie-body">
                <h3 class="movie-name">{{item.title}}</h3>
                <div class="movie-profile">
                  <div><span class="movie-wanna">{{item.collect_count}}</span> 人想看</div>
                  <div class="movie-director">
                    导演:<span v-for="(director, index3) in item.directors" :key="index3">
                      {{director.name}}
                    </span>
                  </div>
                  <div class="movie-casts">
                    演员:<span v-for="(cast, index2) in item.casts" :key="index2">
                      {{cast.name}}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'

  import { getInTheaters } from '@/api/apis/in_theaters.js'
  import { ComingSoonList } from '@/api/apis/coming_soon.js'
  import Topbar from '@/components/Topbar'
  export default {
    data() {
      return {
        isFixed: false,
        isActive: '',
        flag: 0, 
        tabbarInfo: ['正在热映', '即将上映'],
        inTheaterList: {},
        comingList: {},
        currList: [],

      }
    },
    created(){
      this.getInTheaterInfo();
    },
    mounted(){
      this.offset = document.querySelector('.home-tabbar').clientHeight;
      console.log(this.offset);
      window.addEventListener('scroll', this.handleScroll);
    },
    activated(){ //加上keepalive时有效，页面出现时的钩子函数
      window.addEventListener('scroll', this.handleScroll);      
    },
    deactivated(){//加上keepalive时有效，页面隐藏时的钩子函数
      console.log('页面隐藏');
      window.removeEventListener('scroll', this.handleScroll);
    },
    beforeDestroy(){

      window.removeEventListener('scroll', this.handleScroll);
    },
    computed:{
      ...mapState('movie', [
        'comingArr', 'inTheaterArr'
      ])
    },
    methods: {
      ...mapMutations('movie', [
        'setComingArr', 'setIntheaterArr'
      ]),
      async getInTheaterInfo(city = '福州'){
        console.log('intheater');
        if(this.isActive) return;
        this.isActive = !this.isActive || true;
        //从vuex中取数值
        if(this.inTheaterArr && this.inTheaterArr.length > 0){
          this.currList = this.inTheaterArr;
          return;
        }
        
        try {
          let result = await getInTheaters(city);
          console.log(result, 'result_1');
          this.inTheaterList = result.data;
          this.currList = this.inTheaterList.subjects;
          //存到vuex中
          this.setIntheaterArr(this.currList);
        } catch (error) { 
          console.log(error, 'error');
        }
      },
      async getCommingInfo(){
        let temp;
        console.log('comming');
        if(!this.isActive) return;
        this.isActive = !this.isActive;
        this.flag = 1;
        if(this.comingArr && this.comingArr.length > 0){
          this.currList = this.comingArr;
          return;
        };
        try {
          let result = await ComingSoonList();
          console.log(result, 'result_2');
          this.comingList = result.data;
          this.currList = this.comingList.subjects;
          this.setComingArr(this.currList);
        } catch (error) {
          
        }
      },
      handleScroll(){
        const currScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        console.log(currScrollTop, 'scrolltop');
        if(currScrollTop > this.offset){
          this.isFixed = true;
        }else{
          this.isFixed = false;
        }
      },
      goDetail(id){
        console.log(id, '跳转id');
        // this.setDetail(id);
        this.$router.push({path: `/detail/${id}`, query: {id}});
      }
    },

    components:{
      Topbar
    },
  }
</script>

<style lang="scss" scoped>
  .home{
    // background: #ccc;
    // margin: 0 auto;
    .tab-active{
      color: red;
      text-align: center;
      transition: all .3s;
      &::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40%;
        height: 2px;
        background: red;
        transition: all .4s;
      }
    }
    .isFixed{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      
    }
    &-tabbar{
      display: flex;
      justify-content: space-around;
      margin: .5rem 1rem 0 1rem;
      border: 1px solid #ccc;
      border-radius: 3rem;
      background: #fff;
      outline: none;
      box-shadow: 0 0 4rem 1rem #a18cd1;
      
      div{
        position: relative;
        padding: .5rem 0;
      }
    }
    &-content{
      .movie-content{
        display: flex;
        .movie-list{
          margin: 1rem 1rem;
          // border: 1px solid #ccc;
          .movie-item{
            list-style: none;
            height: 8rem;
            display: flex;
            align-items: center;
            padding: .5rem;
            img{
              width: 5rem;
              height: 6rem;
              border-radius: .4rem;
              box-shadow: 0 0 1rem .3rem rgba(0, 0, 0, .3);
            }
            &:not(:last-child){
              margin-bottom: .5rem;
              border-bottom: 1px solid #ccc;
            }
            .movie-body{
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-left: .5rem;
              .movie-profile{
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: .8rem;
                .movie-wanna{
                  color: rgb(247, 183, 7);
                }
              }
            }
          }
        }
      }
    }
  }
  
</style>