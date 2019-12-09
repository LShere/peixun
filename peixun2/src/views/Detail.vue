<template>
    <div class="movie-detail">
        <Common-topbar :title='title'></Common-topbar>
        <!-- <Seize></Seize> -->
        <div class="movie-detail-box" v-if="movieDetail && filterDetail" style="margin-top: 3rem;">
            <div class="detail-cover" :style="{'background-image': `url(${movieDetail.images.small})`}"></div>
            <div class="movie-detail-header" >
                <div class="header-profile">
                    <div class="profile-title">{{movieDetail.title}}</div>
                    <div class="profile-content">
                        <div class="profile-content-top">
                            <span class="content-genres" v-for="(item, index) in movieDetail.genres" :key="index">
                                {{item}}     
                            </span>
                        </div>
                        <div class="profile-content-mid">
                            <span class="content-countries" v-for="(item, index) in movieDetail.countries" :key="index">
                                {{item}}
                            </span> |
                            <span class="content-duration">{{movieDetail.durations[0]}}</span>
                        </div>
                        <div class="profile-content-bottom">
                            <span class="content-pubdate" v-for="(item, index) in movieDetail.pubdates" :key="index">
                                {{item}} 
                            </span>
                        </div>

                    </div>
                </div>
                <div class="header-image">
                    <img :src="movieDetail.images.small" alt="链接失效" width="100%">
                    <i class="iconfont iconplay play-icon"></i>
                    <div class="image-cover" @click="openTrailer"></div>                    
                </div>
            </div>
            <div class="trailer-area" :class="showTrailer == true ? 'trailer-show' : ''">
                <video :src="movieDetail.trailers[0].resource_url" controls class="trailer-self"></video>
                <i class="iconfont iconguan guan-icon" @click="shutdownTrailer"></i>
            </div>
        </div>
        <div class="movie-detail-body">
            <div class="detail-score-area">
                <div class="rating-box">
                    <span class="rating-score">{{movieDetail.rating.average}}</span>
                    <van-rate  v-model="rateValue"/>
                    <span class="rating-count">{{movieDetail.ratings_count}}人评分</span>                    
                </div>
                <div class="rating-bottom">
                    <rating-progress class="rating-progress-box" :ratingDetail='filterDetail'></rating-progress>
                    <div class="movie-summary-box">
                        <h4>剧情介绍</h4>
                        <span class="movie-summary">{{movieDetail.summary}}</span>    
                    </div>                
                </div>
            </div>
            <div class="detail-castAndPhoto-area">
                <Better-scroll :title='comtitle.name1' :scrollData='castData' :tag='tag.name1'></Better-scroll>
                <Better-scroll :title='comtitle.name2' :scrollData='movieDetail.photos' :tag='tag.name2'></Better-scroll>
            </div>
        </div>
        <commentScroll></commentScroll>

    </div>
</template>
<script>
    import { MovieDetail } from '@/api/apis/subject.js'

    import CommonTopbar from '@/components/commonTopbar'
    import Seize from '@/components/Seize'
    import ratingProgress from '@/components/ratingProgress'
    import BetterScroll from '@/components/BetterScroll'
    import commentScroll from '@/components/commentScroll'

    import { mapMutations } from 'vuex'
    export default {
        data() {
            return {
                showTrailer: false,
                movieDetail: {},
                filterDetail: {},
                castData: {},
                title: '电影详情',
                comtitle: {
                    name1: '演职员表',
                    name2: '电影剧照'
                },
                tag: {
                    name1: 'casts',
                    name2: 'photos'
                }
            }
        },
        created() {
            console.log('1111111111111');
            // this.getMovieDetail();
        },
        activated(){
            this.$nextTick(() => {
                this.getMovieDetail();
            });
        },
        computed:{
            // ...mapState('movie', [
            //     'movieId'
            // ]),
            rateValue(){
                return this.movieDetail.rating.average / 2; //10分值除以2
            }
        },
        methods:{
            ...mapMutations('movie', [
                'setCurrMovieId'
            ]),
            async getMovieDetail(){
                try {
                    let id = this.$route.query.id;
                    console.log(id, '获取id');
                    //vuex设置当前movieid
                    this.setCurrMovieId(id);
                    let result = await MovieDetail(id);
                    console.log(result.data, 'result_detail');
                    this.movieDetail = result.data;
                    this.filterDetail = await this.ratingProgressFilter(this.movieDetail.rating.details);
                    console.log(this.movieDetail.casts, this.movieDetail.directors);
                    this.castData = await this.castDataFilter(this.movieDetail.casts, this.movieDetail.directors);
                } catch (error) {
                    console.log('2222');
                    console.log(error);
                }
            },
            ratingProgressFilter(ratingDetail){
                return new Promise((resolve, reject) => {
                    let total = 0,
                        count = 0,
                        filerDetail = [];
                    for(let i in ratingDetail){
                        total += ratingDetail[i];
                    }
                    console.log(total);
                    // total = ratingDetail.reduce((sum, item) => {
                    //     return sum += item;
                    // }, 0);
                    count = Object.keys(ratingDetail).length;
                    console.log(count);
                    for(let i = 1; i <= count; i++){
                        filerDetail.push({ratingIndex: i, value: (ratingDetail[i] / total), ratio: `${parseFloat((ratingDetail[i] / total).toFixed(2)) * 100}%`});
                    }
                    console.log(filerDetail);
                    resolve(filerDetail);
                })
            },
            castDataFilter(casts, directors){
                return Promise.resolve([...casts, ...directors]);
            },
            openTrailer(){
                this.showTrailer = true;
                console.log('show');
            },
            shutdownTrailer(){
                this.showTrailer = false;
                const trailer = document.querySelector('.trailer-self');
                trailer.pause();
            }
        },
        components:{
            CommonTopbar,
            Seize,
            ratingProgress,
            BetterScroll,
            commentScroll
        }
    }
</script>

<style lang="scss" scoped>
    .movie-detail{
        width: 100%;
        // height: 40rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-box{
            height: 12rem;
            box-sizing: border-box;

            .detail-cover{
                position: absolute;
                z-index: -1;
                top: 0;
                background-size: 100%;
                width: 100%;
                height: 15rem;
                filter: blur(6px) brightness(80%);
                clip-path: inset(0 round 0 0 20% 20%);

            }
            .movie-detail-header{
                display: flex;
                color: #fff;
                height: 12rem;
                align-items: center;
                
                .header-profile{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    margin-left: 2rem;
                    .profile-title{
                        font-size: 1.2rem;
                        margin-bottom: .8rem;
                    }
                    .profile-content{
                        display: flex;
                        flex-direction: column;
                        font-size: .8rem;
                        font-weight: 300;
                        line-height:150%;
                    }
                }
                .header-image{
                    position: relative;
                    display: flex;
                    flex: 1;
                    align-items: center;
                    justify-content: center;
                    // perspective: 100;
                    img{
                        width: 60%;
                        height: auto;
                        border: 3px solid #fff;
                        border-radius: .5rem;
                    }
                    .play-icon{
                        position: absolute;
                        font-size: 1.5rem;
                        left:50%;
                        transform: translateX(-50%);
                        background-color: rgba(0, 0, 0, .8);
                        background-clip: content-box;
                        border-radius: 50%;
                    }
                    .image-cover{
                        position: absolute;
                        left: 50%;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        width: 60%;
                        background: transparent;
                        transform: translateX(-50%);
                    }
                }                
            }
            .trailer-area{
                // display: none;
                display: flex;
                align-items: center;
                background:#000;
                position: absolute;
                top: 3rem;
                left: 50%;
                transform: translateX(-50%) rotateY(90deg);
                overflow: hidden;
                width: 100%;
                height: 11rem;
                backface-visibility: hidden;
                visibility: hidden;
                border-radius: 1rem;
                transition: all .5s linear;
                box-shadow: 0 0 3rem 1rem rgba(0, 0, 0, .2);
                video{
                    width: inherit;
                }
                .guan-icon{
                    font-size: 1rem;
                    position: absolute;
                    top: .2rem;
                    left: .5rem;
                    color: #fff;
                }
            }
            .trailer-show{
                // display: flex;
                visibility: visible;
                transform: translateX(-50%) rotateY(0);

            }

        }
        &-body{
            position: relative;
            top: -1.5rem;
            // z-index: 3;
            width: 95%;
            // height: 10rem;
            padding: 1rem;
            box-sizing: border-box;
            background: #fff;
            border-radius: 2rem;
            box-shadow: 0 0 3rem .5rem rgba(0, 0, 0, .2);
            .rating-box{
                display: flex;
                align-items: center;
                justify-content: space-around;
                padding-bottom: .7rem;
                border-bottom: 1px solid #ccc;
                .rating-score{
                    font-size: 1.2rem;
                    margin-right: .5rem;
                }
                .rating-count{
                    font-size: .8rem;
                    // margin-left: 2rem;
                }
            }
            .rating-bottom{
                display: flex;
                overflow: scroll;
                height: inherit;
                padding-bottom: 1rem;
                border-bottom: 1px solid #ccc;

                .rating-progress-box{
                    margin-top: 1rem;
                    width: 50%;
                }
                .movie-summary-box{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 50%;
                    h4{

                    }
                    .movie-summary{
                        height: 3.5rem;
                        overflow: scroll;
                        font-size: .6rem;
                        text-indent: 1rem;
                        
                    }
                }
            }
        }
    }
</style>