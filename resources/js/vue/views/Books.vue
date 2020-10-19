<template>
    <div>
        <b-row align-h="end">
            <b-col cols="4">
                <router-link :to="{name: 'NewBook'}" tag="button" class="btn btn-outline-primary float-right">New book</router-link>
            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col>
                <DataTable v-if="this.tableData.columns.length > 0" :dataTable="tableData"></DataTable>
            </b-col>
        </b-row>
        <b-modal id="mBorrow" :title="modalTitle" @ok="handleOk" @hidden="resetModal" no-close-on-esc no-close-on-backdrop>
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group v-if="book.available>0" :state="bookState.user" label="User" label-for="user-input" invalid-feedback="User is required">
                    <b-form-input v-model="book.user" :state="bookState.user" required disabled></b-form-input>
                </b-form-group>
                <b-form-group v-else :state="bookState.user_id" label="User" label-for="user-select" invalid-feedback="User is required">
                    <v-select id="user-select" :options="users" :reduce="user => user.id" label="name" v-model="book.user_id">
                        <template #search="{attributes, events}">
                            <input
                            id="user-select"
                            :state="bookState.user_id"
                            class="vs__search"
                            :required="!book.user_id"
                            v-bind="attributes"
                            v-on="events"
                            />
                        </template>
                    </v-select>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>
<script>
import DataTable from '../components/DataTable.vue';
export default {
    name: 'Books',
    components:{
        DataTable
    },
    data(){
        return{
            books: [],
            tableData: {
                options: {
                sortable: true,
                editable: true,
                pageCount: 10
                },
                columns: [],
                rows: []
            },
            modalTitle: 'Borrow ',
            bookState: {
                user: null,
                user_id: null
            },
            book: {},
            users: []
        }
    },
    mounted(){
        this.getBooks();
        this.getUsers();
    },
    methods: {
        async getBooks(){
            try {
                let vm = this;
                let req = await axios.get(`/api/books`);
                this.books = req.data.data;

                this.tableData.columns = [
                    {
                        value: 'name',
                        text: 'Name',
                        sortable: true
                    },
                    {
                        value: 'author',
                        text: 'Author',
                        sortable: true
                    },
                    {
                        value: 'category',
                        text: 'Category',
                        sortable: true
                    },
                    {
                        value: 'published',
                        text: 'Published',
                        sortable: true
                    },
                    {
                        value: 'available',
                        text: "Available",
                        sortable: true
                    },
                    {
                        value: 'delete',
                        text: '',
                        isButton: true
                    },
                    {
                        value: 'edit',
                        text: '',
                        isButton: true,
                    },
                    {
                        value: 'borrow',
                        text: '',
                        isButton: true,
                    },
                ];

                let rows = await this.books.map(element => {
                    return {
                        'id': { 'value': element.id },
                        'name': { 'value': element.name },
                        'author': { 'value': element.author },
                        'category_id': { 'value': element.category_id },
                        'category': { 'value': element.category },
                        'published': { 'value': element.published },
                        'user_id': { 'value': element.user_id },
                        'available': { 'value': element.available },
                        'delete': {
                            value: [{
                            row: element,
                            text: 'Remove',
                            class: ['btn', 'btn-danger'],
                            func: async function (event, column, field) {
                                await vm.deleteBook(field.row.id);
                                await vm.getBooks();
                                }
                            }]
                        },
                        'edit': {
                            value: [{
                            row: element,
                            text: 'Edit',
                            class: ['btn', 'btn-info'],
                            func: async function (event, column, field) {
                                    vm.$router.push({ name: 'EditBook', params: { id: field.row.id }});
                                }
                            }]
                        },
                        'borrow': {
                            value: [{
                            row: element,
                            text: element.available === 'no' ? 'Return': 'Borrow',
                            class: ['btn', element.available === 'no' ? 'btn-warning': 'btn-success'],
                            func: async function (event, column, field) {
                                    vm.book.id = field.row.id;
                                    if (element.available === 'no') {
                                        vm.modalTitle = 'Return ' + field.row.name;
                                        vm.book.user = element.user;
                                        vm.book.available = '1';
                                    }else{
                                        vm.modalTitle = 'Borrow ' + field.row.name;
                                        vm.book.available = '0';
                                    }
                                    vm.$bvModal.show('mBorrow');
                                }
                            }]
                        }
                    }
                });
                this.tableData.rows = rows;

            } catch (error) {
                console.error(error);
            }
        },
        async getUsers(){
            try {
                let req = await axios.get(`/api/users`);
                this.users = req.data.data;
                console.log(this.users);
            } catch (error) {

            }
        },
        async deleteBook(id){
            try {
                let req = await axios.delete(`/api/books/`+id);
                console.log(req);
            } catch (error) {
                console.error(error);
            }
        },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.bookState.user = valid
            this.bookState.user_id = valid
            return valid
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        async handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }

            let params = {
                available: this.book.available,
                user_id: this.book.user ? null : this.book.user_id
            };
            let req = await axios.post(`/api/books/`+this.book.id, params);
            await this.getBooks();
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('mBorrow')
            })
        },
        resetModal() {
            this.book = {}
            this.bookState.user = null
            this.bookState.user_id = null
        },
    }
}
</script>
