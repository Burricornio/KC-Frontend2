//Modulo para controlar el numero de caracteres de un textarea

const $ = require("jquery");

export default class TextareaWordsCounter {
    constructor(numberOfWords, textareaIdName, counterId) {
        this.numberOfWords = numberOfWords;
        this.textareaIdName = $(textareaIdName);
        this.counterId = $(counterId);
    }
    init() {
        var wordLen = this.numberOfWords,
        len; 
        this.textareaIdName.keydown( event => {	
            len = this.textareaIdName.val().split(/[\s]+/);
            if (len.length > wordLen) { 
                if ( event.keyCode == 46 || event.keyCode == 8 ) {// Permite borrar y suprimir
                } else if (event.keyCode < 48 || event.keyCode > 57 ) {// Resto de botones
                event.preventDefault();
                }
            }
            var wordsLeft = (wordLen) - len.length;
            this.counterId.html('Tienes <span>' + wordsLeft + '</span> palabras.');
            if(wordsLeft <= 0) {
                this.counterId.html('No te quedan palabras'); 
            }
        });
    }
}



   
	
    
        

        
        
