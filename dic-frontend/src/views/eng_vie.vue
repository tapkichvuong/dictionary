<script>
import wordCard from '@/components/wordCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import wordList from '@/components/wordList.vue';
import en_vnService from '@/services/en_vnServices';
export default {
    components: {
        wordCard,
        InputSearch,
        wordList,
    },
    data() {
        return {
            words: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        wordStrings() {
            return this.words.map((word) => {
                const { name, email, address, phone } = word;
                return [name, email, address, phone].join("");
            });
        },
        filteredWords() {
            if (!this.searchText) return this.words;
            return this.words.filter((_word, index) => this.wordStrings[index].includes(this.searchText));
        },
        activeWord() {
            if (this.activeIndex < 0) return null;
            return this.filteredWords[this.activeIndex];
        },
        filteredWordsCount() {
            return this.filteredWords.length;
        }
    },
    methods: {
        async retrieveWords() {
            try {
                this.words = await en_vnService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveWords();
            this.activeIndex = -1;
        },
        async removeAllWord() {
            if (confirm("Bạn muốn xóa từ điển")) {
                try {
                    await en_vnService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddWord() {
            this.$router.push({ name: "word.add" });
        }
    },
    mounted() {
        this.refreshList();
    }
}
</script>

<template>
    <div class="page row">
        <div class= "mt-3 col-md-12">
            <InputSearch v-model="searchText"/>
        </div>
        <div class= "mt-5 col-md-6">
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" /> Làm mới
                </button>

                <button class="btn btn-sm btn-success" @click="goToAddWord()">
                    <font-awesome-icon icon="fa-solid fa-plus" /> Thêm mới
                </button>

                <button class="btn btn-sm btn-danger" @click="removeAllWord()">
                    <font-awesome-icon icon="fa-solid fa-trash" /> Xóa tất cả
                </button>
            </div>
            <div class="mt-4 mx-5" >
                <wordList v-if="filteredWordsCount > 0" :words="filteredWords" v-model:activeIndex="activeIndex"/>
                <p v-else>Từ điển trống</p>
            </div>
        </div>
        <div class="mt-5 col-md-6">
            <div v-if="activeWord">
                <h4>
                    <i class="fas fa-address-card"></i>
                </h4>
                <wordCard :word="activeWord"/>
                <router-link :to="{name: 'word.edit', params: {id: activeWord._id}, }">
                    <span>
                        <font-awesome-icon icon="fa-solid fa-pen-to-square" /> Hiệu chỉnh
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style>
.page {
    text-align: left;
    max-width: 1024px;
}
</style>