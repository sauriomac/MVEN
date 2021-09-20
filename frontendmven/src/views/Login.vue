<template>
    <div class="container">
<h1>Login con Mven</h1>
<form action=""
>
<input type="email" placeholder="Email" class="form-control my-2" >
<input type="password" placeholder="Password" class="form-control">
<button class="btn btn-primary btn-block my-2" type="submit">Acceder</button>
</form>
    </div>
</template>

<script>
    export default {
        data () {
            return{
            usuario:{email:'',pass:''},
        }
        },
        methods:{
            login(){
                console.log(this.usuario);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>