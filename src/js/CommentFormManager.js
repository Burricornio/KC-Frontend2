// CommentsService - Hacer petición AJAX para guardar la cancion en el backend
// UIManager para gestionar los estados de interfaz
// Acceso al formulario para poder leer los valores de los inputs
// Utilizamos el patrón pubsub para recargar la página al guradar un nuevo comentario
const $ = require("jquery");

import UIManager from "./UIManager";

export default class CommentFormManager extends UIManager {

    constructor(elementSelector, commentsService, pubSub) {
        super(elementSelector); // Llamada al constructor de la clase UIManager
        this.commentsService = commentsService;
        this.pubSub = pubSub;
    }

    init() {
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {
        this.element.on("submit", () => {
            this.validateAndSendData();
            return false; // preventDefault jQuery en los majejadores de evento. event.preventDefault()
        });
    }

    validateAndSendData() {
        if (this.isValidData()) {
            this.sendData();
        }
    }

    isValidData() {
        const inputs = this.element.find("input, textarea");
        for (let input of inputs) {
            if (input.checkValidity() == false) {
                const errorMessage = `Completa el campo ${input.dataset.id}`;
                input.focus();
                this.setErrorHtml(errorMessage);
                this.setError();
                return false;
            }
        }
        // Llegamos a esta línea si no hay ningún error
        this.setIdeal();
        return true;
    }

    sendData() {
        this.setLoading();
        const comment = {
            name: this.element.find("#name").val(),
            lastname: this.element.find("#lastname").val(),
            email: this.element.find("#email").val(),
            message: this.element.find("#message").val()
        };
        this.commentsService.save(comment, success => {
            // Publicamos el evento que informa sobre la creación de un comentario.
            this.pubSub.publish("new-comment", comment);
            this.resetForm() // Resetea el formulario
            this.setIdeal();
        }, 
        error => {
            this.setErrorHtml("Se ha producido un error al guardar el comentario en el servidor");
            this.setError();
        });
    }

    resetForm() {
        this.element[0].reset();
    }

    disableFormControls() {
        this.element.find("input, button").attr("disabled", true);
    }

    enableFormControls() {
        this.element.find("input, button").attr("disabled", false);
    }

    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

    setError() {
        super.setError();
        this.enableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }
}