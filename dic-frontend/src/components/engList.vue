<script>
export default{
    props:{
        words: {type: Array, default:[]},
        activeIndex: {type: Number, default: -1},
    },
    emits:["update:activeIndex"],
    methods: {
        updateActiveIndex(index){
            this.$emit("update:activeIndex", index);
        },
    }
}
</script>

<template>
    <ul class="list-group d-flex justify-content-start">
        <li class="list-group-item text-dark font-weight-bold h5 w-75" v-for="(word, index) in words" :key="word._id" :class="{active:index === activeIndex}" @click="updateActiveIndex(index)">
            {{word.english}}
        </li>
    </ul>
</template>