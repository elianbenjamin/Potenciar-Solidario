export default function validationComment(input){
    let errores = {};
    if(input.thread === ''){
        errores.thread = 'Para enviar una comentario no puede estar vacio'
    }
    if(input.thread.length < 10){
        errores.thread = 'El comentario debe tener minimo 10 caracteres'
    }
    if(input.thread.length > 1000){
        errores.thread = 'El comentario no puede tener mas de 1000 caracteres'
    }
    return errores;
}