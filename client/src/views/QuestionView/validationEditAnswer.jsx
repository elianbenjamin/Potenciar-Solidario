export default function validationEditAnswer(input){
    let errores = {};
    if(input.editingAnswer === ''){
        errores.answer = 'Para enviar una respuesta no puede estar vacia'
    }
    if(input.editingAnswer.length < 20){
        errores.answer = 'La respuesta debe de tener minimo 20 caracteres'
    }
    if(input.editingAnswer.length > 1000){
        errores.answer = 'La respuesta no puede tener mas de 1000 caracteres'
    }
    return errores;
}