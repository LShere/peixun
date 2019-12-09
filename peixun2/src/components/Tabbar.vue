<template>
    <div class="tabbar" v-show="showTab">
        <div class="tabbar-item">
            <i class="iconfont iconyingpingmoban tab-icon"></i>
            <span>{{firstItem}}</span>
        </div>
        <div class="tabbar-item">
            <i class="iconfont iconwode tab-icon"></i>
            <span>{{secondItem}}</span>
        </div>
        <div class="tabbar-center">
            <button href="#">+</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['showTab'],
        data() {
            return {
                firstItem: '院线',
                secondItem: '我的',
            }
        },
        mounted(){
            // console.log(docHeight)
            // console.log(showHeight)

            // window.onresize = (() => {
            //     this.showHeight = document.body.clientHeight;
            // })()
        },
        // watch:{
        //     showHeight(){
        //         this.docHeight > this.showHeight ? this.isShow = false : this.isShow = true;
        //      }
        // }   
    }
</script>

<style lang="scss" scoped>
    .tabbar{
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: fixed;
        height: 3rem;
        bottom: 0;
        left: 0;
        right: 0;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        box-shadow: 0 0 1rem .3rem #ccc;
        // background-image: linear-gradient(to right, #00FF99, #00DD77);
        background-image: linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 150%);
        &-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: 30%;
            // background-image: linear-gradient(to right, )
            .tab-icon{
                font-size: 1.5rem;
                color: #fff;
            }
            span{
                font-size: .8rem;
                color: #fff;
            }
        }
        &-center{
            position: absolute;
            top: -1.7rem;
            button{
                display: inline-flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                width: 4rem;
                height: 4rem;
                border: 0;
                border-radius: 50%;
                background: rgb(190, 98, 186);
                color: #fff;
                box-shadow: 0 2rem 3rem 1rem rgba(0, 0, 0, .3);
                font-size: 3rem;
            }
        }
    }
</style>