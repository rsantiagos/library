<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="success">
            <b-navbar-brand href="#">Library</b-navbar-brand>
        </b-navbar>
        <b-container fluid class="p-3">
            <div>
                <router-view></router-view>
            </div>
        </b-container>
    </div>
</template>
<script>
    export default {
        name:'Pagedefault'
    }
</script>
