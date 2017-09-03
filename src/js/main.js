window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente

import CommentsService from "./CommentsService";
import CommentsListManager from "./CommentsListManager";
import CommentFormManager from "./CommentFormManager";
import PubSub from "pubsub-js";
import ScrollToTop from "./ScrollToTop";
import TextareaWordsCounter from "./TextareaWordsCounter";
import ShowElementOnScroll from './ShowElementOnScroll';
import CalculateTimePost from './CalculateTimePost.js';

const commentsService = new CommentsService("/comments/");

const commentsListManager = new CommentsListManager(".comments-list", commentsService, PubSub);
commentsListManager.init()

const commentFormManager = new CommentFormManager(".comment-form", commentsService, PubSub);
commentFormManager.init();

const scrollToTop = new ScrollToTop(".footer-up");
scrollToTop.init();

const textareaWordsCounter = new TextareaWordsCounter(120, "#message", "#contador");
textareaWordsCounter.init();

// Script para mostrar los comentarios al hacer scroll
let filter = document.getElementById('comments-container');
if(filter){
    const showElementOnScroll = new ShowElementOnScroll('.comments-container');
    showElementOnScroll.init();
}

// Script para mostrar el tiempo transcurrido de cada artículo
const calculateTimePost = new CalculateTimePost();
calculateTimePost.init();

// Script para contadores de likes
$('.thumb-up').each(function(i) {
    let num = i;
    let counter;
    let getCounter = localStorage.getItem(`contador+${num}`); 
    if (getCounter === null ) {
        counter = 0;
        $(this).siblings('.like-counter').text(counter);
     
    } else {
        $(this).css('color', 'rgb(2, 184, 117)');
        counter = getCounter;
        $(this).siblings('.like-counter').text(getCounter);
    }

    $(this).on('click', function(){ 
        $(this).css('color', 'rgb(2, 184, 117)');
        counter++;
        $(this).siblings('.like-counter').text(counter);
        localStorage.setItem(`contador+${num}`, counter);
    });
});



