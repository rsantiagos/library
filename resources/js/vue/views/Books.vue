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
        }
    },
    mounted(){
        this.getBooks();
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
                    }
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
                        }
                    }
                });
                this.tableData.rows = rows;

            } catch (error) {
                console.error(error);
            }
        },
        async deleteBook(id){
            try {
                let req = await axios.delete(`/api/books/`+id);
                console.log(req);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>
