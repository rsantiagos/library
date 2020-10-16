<template>
    <div>
        <DataTable v-if="this.tableData.columns.length > 0" :dataTable="tableData"></DataTable>
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
                        value: 'category_id',
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
                    }
                ];

                let rows = await this.books.map(element => {
                    return {
                        'id': { 'value': element.id },
                        'name': { 'value': element.name },
                        'author': { 'value': element.author },
                        'category_id': { 'value': element.category_id },
                        'published': { 'value': element.published },
                        'user_id': { 'value': element.user_id },
                        'available': { 'value': element.available },
                    }
                });
                this.tableData.rows = rows;

            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>
