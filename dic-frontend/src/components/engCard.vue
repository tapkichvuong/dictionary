<script>
export default {
    props: {
        word: {type: Object, required: true},
    },
}
</script>

<template>
    <div>
        <div class="p-1 h3">
            <strong>English: </strong>
            {{word.tu}}
        </div>
        <div class="p-1 h3">
            <strong>Spelling: </strong>
            {{word.phienam}}
        </div>
        <div class="p-1 h3">
            <strong>Form: </strong>
            {{word.dang}}
        </div>
        <div class="p-1 h3">
            <strong>Việt: </strong>
            {{word.nghia}}
        </div>
        <div class="p-1 h3">
            <strong>Example: </strong>
            {{word.vidu}}
        </div>
        
    </div>
</template>