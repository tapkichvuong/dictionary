<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:word", "delete:word"],
    props: {
        word: { type: Object, required: true }
    },
    data() {
        const wordFormSchema = yup.object().shape({
            Français: yup.string().required('Từ đang trống'),
            spelling: yup.string().required('Phiên âm đang trống'),
            form: yup.string().required('Dạnh từ đang trống'),
            viet: yup.string().required('Nghĩa đang trống'),
            example: yup.string().required('Ví dụ đang trống'),
        });
        return { wordLocal: this.word, wordFormSchema };
    },
    methods: {
        submitWord() {
            this.$emit("submit:word", this.wordLocal);
        },
        deleteWord() {
            this.$emit("delete:word", this.wordLocal.id);
        }
    }
}
</script>

<template>
    <Form @submit="submitWord" :validation-schema="wordFormSchema">
        <div class="form-group">
            <label for="fra">Français</label>
            <Field name="fra" type="text" class="form-control" v-model="wordLocal.Français" />
            <ErrorMessage name="fra" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="spelling">Spelling</label>
            <Field name="spelling" type="text" class="form-control" v-model="wordLocal.spelling" />
            <ErrorMessage name="spelling" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="form">Form</label>
            <Field name="form" type="text" class="form-control" v-model="wordLocal.form" />
            <ErrorMessage name="form" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="viet">Viet</label>
            <Field name="viet" type="text" class="form-control" v-model="wordLocal.viet" />
            <ErrorMessage name="viet" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="example">Example</label>
            <Field name="example" type="text" class="form-control" v-model="wordLocal.example"/>
            <ErrorMessage name="example" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary" @click="submitWord">
                <font-awesome-icon icon="fas fa-save" />
                Lưu
            </button>
            <button v-if="wordLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteWord">
                <font-awesome-icon icon="fa-solid fa-trash" />
                Xóa
            </button>
        </div>
    </Form>
</template>

<style scoped>
@import "@/assets/form.css";
</style>