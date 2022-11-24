
<script>
export default{
    props:{
        modelValue:{type: String, default : ""},
    },
    emits:["submit", "update:modelValue"],
    methods: {
        updateModelValue(e){
            this.$emit("update:modelValue", e.target.value);
        },
        submit(){
            this.$emit("submit");
        }
    }
}
</script>

<template>
    <div class="input-group">
        <input type="search" class="form-control col-md-8" placeholder="Tìm kiếm" :value="modelValue" @input="updateModelValue" @keyup.enter="submit">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="submit">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </button>
        </div>
    </div>
</template>