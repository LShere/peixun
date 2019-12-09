<template>
  <div class="comment-wrapper">
    <div class="comment-tab">
        <div
          class="tab-item"
          :class="hoverIndex == index ? 'hover-item' : ''"
          v-for="(item, index) in tabList"
          :key="index"
          @click="changeTab(index)"
        >
          <span>{{item.name}}</span>
        </div>
    </div>
      <div class="comment-list" ref="commentWrapper" v-if="commentList && commentList.length > 0">
        <ul class="comment-list-content" ref="commentList" id="comment-list-content">
          <li class="comment-list-top">
              <span v-if="pullDownFlag">{{'刷新成功'}}</span>
              <span v-else>{{'刷新中....'}}</span>
          </li>
          <li class="comment-list-content-item" v-for="(item, index) in commentList" :key="index">
            <div class="item-head">
              <div class="item-avatar">
                <img :src="item.author.avatar" alt="" width="100%">
              </div>
              <span class="item-name">{{item.author.name}}</span>
              <span class="item-createtime">{{item.created_at}}</span>
              <div class="item-rating">
                <van-rate  v-model="item.rating.value" size="10px" readonly allow-half/>
              </div>
            </div>
            <div class="item-body">
              <span>{{item.content}}</span>
            </div>
            <div class="item-bottom">
              <div class="bottom-box">
                <i class="iconfont iconzan comment-icon"></i>
                <span>{{item.useful_count}}</span>
              </div>
              <!-- <div class="bottom-box">
                <i class="iconfont iconcai comment-icon"></i>
                <span>{{item.caiCount}}</span>
              </div> -->
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import { Comments } from '@/api/apis/comments.js'

import { mapState, mapMutations } from 'vuex'
import { async } from 'q';
export default {
  data() {
    return {
      // mockCommentList:[
      //   {name: 'ava', avatar: require('../assets/logo.png'), createtime: '2019-11-22 11:23:02', value: 3, content: '哇水水水水水水水水水水水水水水水水水水的发射点发射点发射点发射点发射点发射点', zanCount: 100, caiCount: 50},
      //   {name: 'ava', avatar: require('../assets/logo.png'), createtime: '2019-11-22 11:23:02', value: 3, content: '哇水水水水水水水水水水水水水水水水水水的发射点发射点发射点发射点发射点发射点', zanCount: 100, caiCount: 50},
      //   {name: 'ava', avatar: require('../assets/logo.png'), createtime: '2019-11-22 11:23:02', value: 3, content: '哇水水水水水水水水水水水水水水水水水水的发射点发射点发射点发射点发射点发射点', zanCount: 100, caiCount: 50},
      //   {name: 'ava', avatar: require('../assets/logo.png'), createtime: '2019-11-22 11:23:02', value: 3, content: '哇水水水水水水水水水水水水水水水水水水的发射点发射点发射点发射点发射点发射点', zanCount: 100, caiCount: 50},
      //   {name: 'ava', avatar: require('../assets/logo.png'), createtime: '2019-11-22 11:23:02', value: 3, content: '哇水水水水水水水水水水水水水水水水水水的发射点发射点发射点发射点发射点发射点', zanCount: 100, caiCount: 50},
      //   {name: 'ava', avatar: require('../assets/logo.png'), createtime: '2019-11-22 11:23:02', value: 3, content: '哇水水水水水水水水水水水水水水水水水水的发射点发射点发射点发射点发射点发射点', zanCount: 100, caiCount: 50},
      //   {name: 'ava', avatar: require('../assets/logo.png'), createtime: '2019-11-22 11:23:02', value: 3, content: '哇水水水水水水水水水水水水水水水水水水的发射点发射点发射点发射点发射点发射点', zanCount: 100, caiCount: 50},
      //   {name: 'ava', avatar: require('../assets/logo.png'), createtime: '2019-11-22 11:23:02', value: 3, content: '哇水水水水水水水水水水水水水水水水水水的发射点发射点发射点发射点发射点发射点', zanCount: 100, caiCount: 50},
      //   {name: 'ava', avatar: require('../assets/logo.png'), createtime: '2019-11-22 11:23:02', value: 3, content: '哇水水水水水水水水水水水水水水水水水水的发射点发射点发射点发射点发射点发射点', zanCount: 100, caiCount: 50},
      //   {name: 'ava', avatar: require('../assets/logo.png'), createtime: '2019-11-22 11:23:02', value: 3, content: '哇水水水水水水水水水水水水水水水水水水的发射点发射点发射点发射点发射点发射点', zanCount: 100, caiCount: 50},
      //   {name: 'ava', avatar: require('../assets/logo.png'), createtime: '2019-11-22 11:23:02', value: 3, content: '哇水水水水水水水水水水水水水水水水水水的发射点发射点发射点发射点发射点发射点', zanCount: 100, caiCount: 50},

      // ],
      // scroll: '',
      commentList: [],
      value: 3,
      tabList: [
        {
          name: "短评"
        },
        {
          name: "影评"
        }
      ],
      hoverIndex: 0,
      pullDownFlag: false,
      pullUpFlag: false,
      commentpage: 0,
      sort: {
        name1: 'refresh',
        name2: 'upload'
      }
    };
  },
  created(){
    
  },
  async mounted(){
    await this.getComments({sort: this.sort.name1});
    this.$nextTick(() => {
    if(!this.scroll){
       this.scroll = new Bscroll(this.$refs.commentWrapper, {
        scrollX: false,
        scrollY: true,
        pullDownRefresh: { //开启下拉加载
          threshold: 10,
          probeType: 3
        },
        pullUpLoad: { //开启上拉刷新
          threshold: 30,
          probeType: 3
        }
      })
    }else{
      this.scroll.refresh();
    }
    //监听下拉刷新事件
    this.scroll.on('pullingDown', async () => {
      await this.getComments({sort: this.sort.name1}); //重新加载
      this.$nextTick(() => {
        this.scroll.refresh() // DOM 结构发生变化后，重新初始化BScroll
        this.pullDownFlag = true;
        setTimeout(() => {
          this.pullDownFlag = false;
        }, 300);
        this.commentpage = 0; //刷新完成后将页数置为0
      })
      this.scroll.finishPullDown(); // 下拉刷新动作完成后调用此方法告诉BScroll完成一次下拉动作
    })
    // 监听下拉加载事件
    this.scroll.on('pullingUp', async () => {
      await this.getComments({sort: this.sort.name2,start: ++ this.commentpage});
      this.$nextTick(() => {
        this.scroll.refresh();
      })
      this.scroll.finishPullUp() // 上拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
    })
    // this.$refs.commentList.style.height = this.mockCommentList.length * document.querySelector('.comment-list-content-item').style.height;
    })
  },
  computed:{
    ...mapState('movie', [
      'movieId', 'commentsArr', 'reviewsArr'
    ])
  },
  created(){
  },
  methods: {
    ...mapMutations('movie', [
      'setCommentsArr', 'setReviewsArr'
    ]),
    changeTab(index) {
      if (this.hoverIndex == index) return;
      this.hoverIndex = index;
    },
    async getComments({sort = 'refresh', start = 0, count = 10}){
        try {
          console.log(sort, start, count);
          let result = await Comments({id: this.movieId, start, count});
          console.log(result.data.comments, 'comments');
          sort == 'refresh' && (this.commentList = result.data.comments);
          sort == 'upload' && (this.commentList = [...this.commentList, ...result.data.comments]);
          //存入vuex中
          this.setCommentsArr(this.commentList);
          return Promise.resolve('ok');
        } catch (error) {
          console.log(error);
        }
    }
  }
};
</script>

<style lang="scss" scoped>
$tab-background: linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%);
.comment-wrapper {
  display: flex;
  position: relative;
  bottom: 1rem;
  flex-direction: column;
  width: 95%;
  align-items: center;
//   border: 1px solid #ccc;
  border-radius: 1rem;
  font-size: 0.8rem;
  .comment-tab {
    display: flex;
    align-items: center;
    width: 80%;
    justify-content: space-around;
    border-radius: 1rem;
    height: 2rem;
    padding-bottom: 1rem;
    // border-bottom: 1px solid #ccc;
      .tab-item {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        border-radius: inherit;
        background: transparent;
        width: 50%;
        height: 100%;
        transition: all 0.5s;
        &:last-child::after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: inherit;
            border-radius: inherit;
            background: $tab-background;
            z-index: -2;
            transition: all .5s ;
            transform: translateX(-100%);
        }
      }
      .hover-item {
        background: $tab-background;
        color: #fff;
        border-radius: inherit;
        transition: all 0.5s;
        &::after {
          transform: translateX(0) !important;
        
      }
    }
  }
  .comment-list{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 20rem;
    // border: 1px solid #ccc;
    border-radius: 3rem;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 3rem .3rem rgba(0, 0, 0, .2);
    &-content{
      display: flex;
      flex-direction: column;
      .comment-list-top{
        display: flex;
        position: absolute;
        top: -3rem;
        height:4rem;
        width: 100%;
        align-items: center;
        justify-content: center;
        font-size: .8rem;
        color: #fff;
        background: $tab-background;
        // visibility: hidden;
      }
      .showLoading{
        visibility: visible;
      }
      &-item{
        display: flex;
        flex-direction: column;
        margin: 1rem;
        border-bottom: 1px solid #ccc;
        .item-head{
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: .8rem;
          .item-avatar{
            overflow: hidden;
            border-radius: 50%;
            box-shadow: 0 0 1rem .2rem rgba(0, 0, 0, .3);
            img{
              width: 2rem;
              height: 2rem;
            }
          }
          .item-name{
            font-size: .8rem;
          }
          .item-createtime{
            color: rgb(129, 129, 129);
            font-size: .5rem;
          }
          .item-rating{

          }
        }
        .item-body{
          margin-top: .5rem;
          text-indent: 1rem;
          span{
            font-size: .6rem;
          }
        }
        .item-bottom{
          display: flex;
          align-items: center;
          padding: .5rem;
          justify-content: flex-end;
          .bottom-box{
            text-align: center;
            width: 30%;
            color: rgb(117, 115, 115);
            .comment-icon{
              font-size: .8rem;
            }
          }
        }
      }
    }
  }
}
</style>