import UIManager from './UIManager';

export default class CommentsListManager extends UIManager {

    constructor(elementSelector, commentsService, pubSub) {
        super(elementSelector);
        this.commentsService = commentsService;
        this.pubSub = pubSub;
    }

    init() {
        this.loadComments();
        let self = this;
        this.element.on("click", ".close", function() {
            let commentId = this.dataset.id;
            self.deleteComment(commentId);
        });
        this.pubSub.subscribe("new-comment", (topic, comment) => {
            this.loadComments();
        })
    }

    loadComments() {
        // Cargar la lista de comentarios
        this.commentsService.list(comments => {

            // Llamamos al metodo para incluir el total de comentarios en los articulos
                this.numberOfComments(comments);
                
            // Comprobamos si hay comentarios
            if (comments.length == 0) {
                // Mostramos el estado vacío
                this.setEmpty();
            } else {
                
                // Llamamos al metodo para pintar el listado de comentarios
                this.renderComments(comments);

                // Quitamos el mensaje de cargando y mostramos la lista de comentarios
                this.setIdeal();
            }
        }, error => {
            // Mostrar el estado de error
            this.setError();

            // Hacemos log del error en la consola
            console.error("Error al cargar los comentarios", error);
        });
    }

    renderComments(comments) {
        // Componemos el HTML con todas los comentarios
        let html = "";
        for (let comment of comments) {
            html += this.renderComment(comment);
        }

        // Metemos el HTML en el div que contiene los comentarios
        this.setIdealHtml(html);
    }

    renderComment(comment) {
        return `<div class="comment">
                        <div class="comment-name">${comment.name} ${comment.lastname}</div>
                        <p class="comment-text">${comment.message}</p>
                        <span class="close" data-id="${comment.id}">
                            <i class="material-icons">clear</i>
                        </span>
                </div>`;
    }

    deleteComment(commentId) {
        this.setLoading();
        this.commentsService.delete(commentId, success => {
            this.loadComments();
        }, error => {
            this.setError();
        });
    }

    // Metodo para incluir el número total de comtentarios.
    numberOfComments(comments) {
        var numComments = document.querySelectorAll('.number-of-comments');
        for (let comment of numComments) {
            comment.innerHTML = `Número de comentarios: <span class="comments-length">${comments.length}</span>`;
        }
    }

}


