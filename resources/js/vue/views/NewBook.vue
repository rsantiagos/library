<template>
    <div>
        <b-row>
            <b-col>
                <b-form @submit="onSubmit" @reset="onReset">

                    <b-form-group id="input-group-1" label="Book name:" label-for="input-1">
                        <b-form-input
                        id="input-1"
                        v-model="form.name"
                        required
                        placeholder="Enter name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Author:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        v-model="form.author"
                        required
                        placeholder="Enter author"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Category:" label-for="input-3">
                        <b-form-select
                        id="input-3"
                        v-model="form.category_id"
                        :options="categories"
                        required
                        ></b-form-select>
                    </b-form-group>

                    <div class="form-group">
                        <label for="datepicker-valid">Published</label>
                        <b-form-datepicker id="datepicker-valid" v-model="form.published" :state="true"></b-form-datepicker>
                    </div>

                    <b-form-group label="Available">
                        <b-form-radio v-model="form.available" name="some-radios" value="0">No</b-form-radio>
                        <b-form-radio v-model="form.available" name="some-radios" value="1">Yes</b-form-radio>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button v-if="!bookID" type="reset" variant="danger">Reset</b-button>
                </b-form>
            </b-col>
        </b-row>
        <b-row class="mt-5">
            <b-col md="6" class="ml-md-auto p-3">
                <router-link to="/" tag="button" class="btn btn-outline-info float-center"><b-icon icon="arrow-return-left" aria-hidden="true"></b-icon> Back</router-link>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    name:'NewBook',
    data() {
      return {
        bookID: null,
        form: {
          name: '',
          author: '',
          category_id: null,
          available: 1,
          published: ''
        },
        categories: [{ text: 'Select One', value: null }],
        show: true
      }
    },
    mounted(){
        if (this.$route.params.id) {
            this.bookID = this.$route.params.id;
            this.getBook(this.$route.params.id);
        }
        this.getCategories();
    },
    methods: {
        async getCategories(){
            try {
                let res = await axios.get('/api/categories');
                let cat = res.data.data.map(ele => {
                    return {
                        text: ele.name,
                        value: ele.id
                    }
                });
                this.categories = this.categories.concat(cat);
            } catch (error) {
                console.error(error);
            }
        },
        async getBook(id){
            try {
                let resp = await axios.get('/api/book/' + id);
                console.log(resp.data.data);
                this.form = resp.data.data[0];
            } catch (error) {

            }
        },
        onSubmit(evt) {
            evt.preventDefault()
            if (!this.bookID) {
                this.addNewBook(this.form);
            }else{
                this.updateBook(this.form);
            }
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.name = ''
            this.form.author = ''
            this.form.category = null
            this.form.available = 1
        },
        async addNewBook(book) {
            try {
                book.user_id = null;
                let save = await axios.post("/api/books", book);
                // console.log(save);
                this.$router.back();
            } catch (error) {
                console.error(error);
            }
        },
        async updateBook(book) {
            try {
                let save = await axios.post("/api/books/"+this.bookID, book);
                this.$router.back();
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>
