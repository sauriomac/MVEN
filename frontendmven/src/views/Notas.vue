<template>
    <div>
       <b-alert
  :show="dismissCountDown"
  dismissible
  :variant="mensaje.color"
  @dismissed="dismissCountDown=0"
  @dismiss-count-down="countDownChanged"
>
  {{mensaje.texto}}
</b-alert>
        <form @submit.prevent="agregarNota(nota)" v-if="!editar">
  <h3 class="text-center">Agregar nueva Nota</h3>
  <input type="text" placeholder="Ingrese un Nombre" class="form-control my-2" v-model="nota.nombre">
  <input type="text" placeholder="Ingrese una descripcion" class="form-control my-2" v-model="nota.descripcion">
  <button class="btn-sm btn-block btn-success" type="submit">Agregar</button>
</form>
 <form @submit.prevent="editarNota(notaEditar)" v-if="editar">
  <h3 class="text-center">  Editar  Nota</h3>
  <input type="text" placeholder="Ingrese un Nombre" class="form-control my-2" v-model="notaEditar.nombre">
  <input type="text" placeholder="Ingrese una descripcion" class="form-control my-2" v-model="notaEditar.descripcion">
  <button class="btn-sm btn-success" type="submit">Editar</button>
  <button class="btn-sm  mx-2" type="submit" @click="editar = false">Cancelar</button>
</form>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#33</th>
      <th scope="col">Nombre</th>
      <th scope="col">Descripción</th>
      <th scope="col">Fecha</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in notas" :key="index">
      <th scope="row">{{item._id}}</th>
      <td>{{item.nombre}}</td>
      <td>{{item.descripcion}}</td>
      <td>{{item.date}}</td>
      <td>
        <button class="btn-warning btn-sm mx-2" @click="activarEdicion(item._id)">Actualizar</button>
        <button class="btn-danger btn-sm mx-2" @click="eliminarNota(item._id)">Eliminar</button>
      </td>
    </tr>
  </tbody>
</table>    </div>
</template>

<script>
   export default {
  data() {
    return {
      notas: [],
      nota: {nombre:'',descripcion:''},
       mensaje: {color: 'success', texto: ''},
      dismissSecs: 5,
      dismissCountDown: 0,
      editar:false,
      notaEditar:{}
    
    };
  },
  created(){
    this.listarNotas();
  },
  methods:{

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },

      countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    activarEdicion(id){
      this.editar = true
      console.log(id);

      this.axios.get(`/nota/${id}`)
      .then(res =>{
        this.notaEditar = res.data;
        
      })
      .catch(e =>{
        console.log(e.response)
      })
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    agregarNota(){
      console.log(this.nota);
      this.axios.post('/nueva-nota', this.nota)
      .then(res =>{
        this.notas.push(res.data)
        this.nota.nombre = '';
        this.nota.descripcion = '';


      })
      .catch(e =>{
        console.log(e.response)
      })
      
    },
    eliminarNota(id){
       this.axios.delete(`nota/${id}`)
      .then(res =>{
        let index = this.notas.findIndex(item => item._id === res.data._id);
        this.notas.splice(index, 1);
        this.mensaje.color ='success';
        this.mensaje.texto = 'Nota eliminada';
        this.showAlert();
     
      })
      .catch(e =>{
        console.log(e.response);
      })

    },
    editarNota(item){
      this.axios.put(`nota/${item._id}`, item)
      .then(res =>{
        let index = this.notas.findIndex(notaEditar => notaEditar._id === res.data._id);
        this.notas[index].nombre = res.data.nombre;
        this.notas[index].descripcion =res.data.descripcion;
        // this.mensaje.color ='success';
        // this.mensaje.texto = 'Nota editada';
        // this.showAlert();
        this.editar = false;
      })
      .catch(e =>{
        console.log(e.response);
      })

    },

    listarNotas(){
      this.axios.get('/nota')
      .then((response) => {
        console.log(response.data)
        this.notas = response.data;

        
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    
  }
  
};
</script>

<style lang="scss" scoped>

</style>