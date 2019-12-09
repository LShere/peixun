<template>
    <div class="rating-progress" v-if="ratingDetail">
        <div class="progress-item" v-for="(item, index) in ratingDetail" :key="index">
            <span>{{item.ratingIndex}}星</span>
            <progress :value="item.value" max="1"></progress>
            <span>{{item.ratio}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'ratingDetail'
        ],
        data() {
            return {
                // ratingDetail: [
                //     {ratingIndex: 1, value: 0.2, ratio: '20%'},
                //     {ratingIndex: 2, value: 0.2, ratio: '20%'},
                //     {ratingIndex: 3, value: 0.2, ratio: '20%'},
                //     {ratingIndex: 4, value: 0.2, ratio: '20%'},
                //     {ratingIndex: 5, value: 0.2, ratio: '20%'},
                // ]
            }
        },
    }
</script>

<style lang="scss" scoped>
    .rating-progress{
        line-height: 150%;
        font-size: .5rem;
        .progress-item{
            span:nth-child(1){
                margin-right: .3rem;
            }
            span:last-child{
                margin-left: .3rem;
            }
            progress{
                // background: #ccc;
                border: none;
                border-radius: .2rem;
                &::-webkit-progress-value{
                    // background: rgb(243, 219, 4);
                    background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
                    border-radius: .2rem;
                }
                &::-webkit-progress-bar{
                    background: rgba(204, 204, 204, 0.445);
                    border-radius: .2rem;
                }
            }
            
        }
    }
</style>