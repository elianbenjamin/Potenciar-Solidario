export default function validationEditComment(input){
    let errores = {};
    if(input.editingComment === ''){
        errores.editingComment = 'Para enviar una comentario no puede estar vacio'
    }
    if(input.editingComment.length < 10){
        errores.editingComment = 'El comentario debe tener minimo 10 caracteres'
    }
    if(input.editingComment.length > 1000){
        errores.editingComment = 'El comentario no puede tener mas de 1000 caracteres'
    }
    return errores;
}