<script>
import wordCard from '@/components/fraCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import wordList from '@/components/fraList.vue';
import fr_vnService from '@/services/fr_vnServices';
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
                const { Français, form, viet, example } = word;
                return [Français, form, viet, example].join("");
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
                this.words = await fr_vnService.getAll();
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
                    await fr_vnService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddWord() {
            this.$router.push({ name: "fra.add" });
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
                <router-link :to="{name: 'fra.edit', params: {id: activeWord._id}, }">
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