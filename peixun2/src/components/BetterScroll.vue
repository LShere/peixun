<template>
  <div class="scroll-area">
      <h4 class="title">
          {{title}}
      </h4>
    <div class="scroll-content" ref="wrapper">
      <ul class="content" ref="cont" v-if="tag == 'casts' && scrollData">
        <li v-for="(item, index) in scrollData" :key="index" class="content-item">
          <div class="content-img">
            <img :src="item.avatars.small" alt='失效' width="100%"/>
          </div>
            <span>{{item.name}}</span>
        </li>
      </ul>
      <ul class="content" ref="cont2" v-else-if="tag == 'photos' && scrollData">
          <li v-for="(item, index) in scrollData" :key="index" class="content-item2">
              <div class="content-img2">
                  <img :src="item.image" alt="失效" width="100%"/>
              </div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
    props:{
          title:{
              type: String,
              required: true
          },
          tag:{
              type: String,
              required: true
          },
          scrollData:{
              type: Array,
              required: true,
              default: []
          }
      },
  data() {
    return {
        // tag: 'casts',
        // scrollData:[
        //     {}
        // ]
      // list:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        startX: 0,
        scrollX: true,
        scrollY: false
      });
    //   this.$refs.cont.style.width = this.scrollData.length * 6 + 'rem'; //动态计算cont宽度
    });
  }
};
</script>

<style lang="scss" scoped>
    .scroll-area{
        padding-bottom: 1rem;
        border-bottom: 1px solid #ccc;
        .scroll-content{
            display: flex;
            width: inherit;
            overflow: hidden;
            .content{
                display: flex;
                align-items: center;
                .content-item{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 4rem;
                    }
                    img{
                        height: 4rem;
                        width: auto;
                    }
                    span{
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: .6rem;
                    }
                }
                .content-item2{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 5rem;
                    .content-img2{
                        &:not(:last-child){
                            margin-right: 1rem;
                        }
                        img{
                            width: 4rem;
                            height: 4rem;
                        }
                        span{
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: .6rem;
                    }
                }
            }
        }
    }
</style>