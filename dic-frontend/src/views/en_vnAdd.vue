<script>
import WordForm from "@/components/engForm.vue";
import en_vnService from "@/services/en_vnServices";
export default {
    components: {
        WordForm,
    },
    data() {
        return {
            word: {
                'english': "",
                'spelling': "",
                'form': "",
                'viet': "",
                'example': "",
            },
            message: "",
        };
    },
    methods: {
        async createWord(data) {
            try {
                await en_vnService.create(data);
                this.message = "Từ mới thêm thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<template>
    <div v-if="word" class="d-flex flex-column m-auto w-50">
        <h4>Thêm từ mới</h4>
        <WordForm :word="word" @submit:word="createWord" />
        <p>{{ message }}</p>
    </div>
</template>