<script>
import WordForm from "@/components/engForm.vue";
import en_vnService from "@/services/en_vnServices";
export default {
    components: {
        WordForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            word: null,
            message: "",
        };
    },
    methods: {
        async getWord(id) {
            try {
                this.word = await en_vnService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateWord(data) {
            try {
                await en_vnService.update(this.word._id, data);
                this.message = "Từ được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteWord() {
            if (confirm("Bạn muốn xóa từ này?")) {
                try {
                    await en_vnService.delete(this.word._id);
                    this.$router.push({ name: "eng_vie" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getWord(this.id);
        this.message = "";
    },
};
</script>

<template>
    <div v-if="word" class="d-flex flex-column m-auto w-50">
        <h4>Hiệu chỉnh từ</h4>
        <wordForm :word="word" @submit:word="updateWord" @delete:word="deleteWord" />
        <p>{{ message }}</p>
    </div>
</template>