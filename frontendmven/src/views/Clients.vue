<template>
    <div class="container">

    <div class="card mx-5" style="width: 60rem;"  >
 
<h2>{{$route.params.id}}</h2>
<h3>id con parametros</h3>
<h3>{{client.nombre}}</h3>
<h3>{{client.pais}}</h3>
<h3>{{client.email}}</h3>
<h3>{{client.descripcion}}</h3>
<h3>{{client.date}}</h3>
    </div>
        </div>
</template>

<script>
    export default {
         data() {
    return {
      client: [],
      paises:[]
     
    
    };
  },
  created(){
    this.listarNotas();
    this.country();
    
  },
  methods:{

    listarNotas(){
      this.axios.get(`/nota/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data)
        this.client = response.data;

        
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    country(){
   this.axios.get("https://restcountries.eu/rest/v2/all").then((result) => {
      console.log(result.data);
     this.paises = result.data
    
     

      })
      .catch(e =>{
        console.log(e.response);
      })

    }
  },

};
        
</script>

<style lang="scss" scoped>

</style>