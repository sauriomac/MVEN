import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const notaSchema = new Schema({

    nombre: {type: String, required: [true, 'Nombre obligatorio']},
    email: {type: String, required: [true, 'email obligatorio']},
    pais: {type: String, required: [true, 'pais obligatorio']},
    descripcion: String,
    usuarioId: String,
    date:{type: Date, default: Date.now},
    activo: {type: Boolean, default: true}


});

//convertir a modelo

const Nota = mongoose.model('nota',notaSchema);

export default Nota;