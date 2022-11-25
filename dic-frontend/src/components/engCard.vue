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
            {{word.english}}
        </div>
        <div class="p-1 h3">
            <strong>Form: </strong>
            {{word.form}}
        </div>
        <div class="p-1 h3">
            <strong>Việt: </strong>
            {{word.viet}}
        </div>
        <div class="p-1 h3">
            <strong>Example: </strong>
            {{word.example}}
        </div>
        
    </div>
</template>