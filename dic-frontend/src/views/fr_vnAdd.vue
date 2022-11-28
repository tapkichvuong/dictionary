<script>
import WordForm from "@/components/fraForm.vue";
import fr_vnService from "@/services/fr_vnServices";
export default {
    components: {
        WordForm,
    },
    data() {
        return {
            word: {
                'Français': "",
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
                await fr_vnService.create(data);
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