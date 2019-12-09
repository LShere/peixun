<template>
  <div class="loading-box">
    <div class="cover"></div>
    <div class="arc">
      <!-- <h1>
        <span>Loading</span>
      </h1> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.loading-box {
  // .cover {
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   background-color: rgba(255, 255, 255, 0.1);
  //   filter: blur(3px) brightness(80%);
  // }
  .arc {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border-top: 2px solid #ffea28;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    animation: rt 2s infinite linear;
    &::before {
      content: "";
      position: absolute;
      margin: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border-top: 2px solid #8d29ff;
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;
      animation: rt 4s infinite linear reverse;
    }
    &::after {
      content: "";
      position: absolute;
      margin: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 0px;
      height: 0px;
      border-radius: 50%;
      border-top: initial;
      border-left: initial;
      border-right: initial;
      // animation: cw 1s infinite;
      background: #ccc;
    }
    // h1 {
    //   position: absolute;
    //   height: 40px;
    //   margin: auto;
    //   top: 200px;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    //   text-align: center;
    //   letter-spacing: 0.1rem;
    //   font-size: 14px;
    //   font-weight: 700;
    //   color: rgb(26, 23, 23);
    //   span {
    //     display: none;
    //     &::after {
    //       content: "";
    //       animation: txt 5s infinite;
    //     }
    //   }
    // }
  }
}
@keyframes rt {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes cw {
  0% {
    width: 0;
    height: 0;
  }
  75% {
    width: 40px;
    height: 40px;
  }
  100% {
    width: 0;
    height: 0;
  }
}
// @keyframes txt {
//   0% {
//     content: "LOADING.";
//   }
//   50% {
//     content: "LOADING..";
//   }
//   100% {
//     content: "LOADING...";
//   }
// }
</style>