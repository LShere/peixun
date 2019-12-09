<template>
  <div class="search-box">
    <div class="search-header">
      <i class="iconfont iconsearch search-icon"></i>
      <input
        type="text"
        placeholder="请输入要搜索的内容"
        id="search-content"
        v-model="inputValue"
        @input="searchMovie(true)"
        @blur="searchMovie(false)"
      />
      <div class="search-content" :class="{'search-active': isSearch}">
        <div
          class="search-item"
          v-for="(item, index) in searchInfo"
          :key="index"
          @click="goDetail(item.id)"
        >
          <div class="movie-img">
            <img :src="item.img" alt="链接失效" width="100%" />
          </div>
          <div class="movie-body">
            <div class="movie-name">{{item.movie_name}}</div>
            <div class="movie-profile">{{item.profile}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="search-body">
      <ul class="search-list">
        <li class="list-item" v-for="(item, index) in search_history" :key="index">{{item.name}}</li>
      </ul>
      <button class="search-clear" @click="clearHistory" v-show="search_history.length > 0">
        <i class="iconfont iconlajixiang delete-icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      isSearch: false,
      search_history: [
        {
          name: "红楼梦"
        },
        {
          name: "红楼梦"
        },
        {
          name: "红楼梦"
        },
        {
          name: "红楼梦"
        },
        {
          name: "红楼梦"
        },
        {
          name: "红楼梦"
        }
        ,
        {
          name: "红楼梦"
        }
      ],
      searchInfo: [
        {
          id: "1",
          img: require("@/assets/demoimg.jpg"), //本地图片使用require进来,别使用url
          movie_name: "速度与激情",
          profile: "这是一个冒险故事"
        },
        {
          id: "2",
          img: require("@/assets/demoimg.jpg"),
          movie_name: "速度与激情",
          profile: "这是一个冒险故事"
        },
        {
          id: "3",
          img: require("@/assets/demoimg.jpg"),
          movie_name: "速度与激情",
          profile: "这是一个冒险故事"
        },
        {
          id: "3",
          img: require("@/assets/demoimg.jpg"),
          movie_name: "速度与激情",
          profile: "这是一个冒险故事"
        }
      ]
    };
  },
  methods: {
    searchMovie(bool) {
      console.log(bool);
      if (this.searchInfo.length > 0 && bool && this.inputValue) {
        this.isSearch = true;
      } else {
        this.isSearch = false;
      }
    },
    goDetail(id) {},
    clearHistory() {
      this.$nextTick(() =>{
        this.search_history = [];
      })
      console.log(this.search_history);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-box {
  .search-header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    height: 3rem;
    background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 150%);
    input {
      border: none;
      outline: none;
      transition: all 0.2s;
      background: transparent;
      height: 80%;
      font-size: 1rem;
      padding: 0.2rem;
      border-radius: 3rem;
      color: #ccc;
      text-align: center;
      border-bottom: 3px solid transparent;

      &:focus {
        border-bottom: 3px solid rgba(223, 135, 135, 0.897);
      }
    }
    .search-icon {
      font-size: 2rem;
      color: #fff;
    }
    .search-content {
      visibility: hidden;
      transform: translateY(-14rem);
      opacity: 0;
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 30vh;
      width: 100%;
      left: 0;
      right: 0;
      top: -1rem;
      background-image: linear-gradient(to bottom, #a18cd1, transparent);
      box-shadow: 0 2rem 3rem 0.2rem rgba(0, 0, 0, 0.2);
      margin: 4rem auto;
      border-bottom-left-radius: 3rem;
      border-bottom-right-radius: 3rem;
      padding-bottom: 1rem;
      background-clip: border-box;
      box-sizing: border-box;
      overflow: scroll;
      transition: all 0.3s;
      z-index: 1;
      .search-item {
        display: flex;
        align-items: center;
        padding: 0.5rem 0;
        &:not(:last-child) {
          border-bottom: 1px solid #ccc;
        }
        .movie-img {
          margin-right: 2rem;
          img {
            width: 3rem;
            height: 3rem;
            border-radius: 0.5rem;
          }
        }
        .movie-body {
          overflow: hidden;
          width: 70%;
          white-space: nowrap;
          text-overflow: ellipsis;
          .movie-name {
            font-weight: 700;
          }
          .movie-profile {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-top: 0.5rem;
            font-size: 0.8rem;
          }
        }
      }
    }
    .search-active {
      visibility: visible;
      opacity: 1;
      transform: translate(0rem);
      
    }
  }
  .search-body {
    width: 100%;
    position: absolute;
    right: 0;
    left: 0;
    // top: 15rem;
    .search-list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-wrap: wrap;
      // width: 100%;
      .list-item {
        margin-top: 1rem;
        display: inline-block;
        width: 2rem;
        font-size: .6rem;
        text-align: center;
        padding: .4rem;
        height: 1rem;
        border: 1px solid #ccc;
        border-radius: 3rem;
        background-image: linear-gradient(to right, #a18cd1 0%, #fbc2eb 150%);
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;        

      }
    }
  }
  .search-clear{
    outline: none;
    display: flex;
    // position: absolute;
    // right: 0;
    float: right;
    margin-right: 1rem;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 1rem;
    background: #fff;
    width: 3rem;
    height: 3rem;
    transition: all .3s;
    &:focus{
      transform: scale(1.1);
    }
    .delete-icon{

      font-size: 1rem;
      color: #ccc;
    }
  }
}
</style>