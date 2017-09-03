const $ = require("jquery");

export default class ScrollToTop {
    constructor(element) {
        this.element = $(element);
    }

    init() {
        this.element.on("click", function() {
            $('html, body').animate({scrollTop:0}, 'swing');
        })
    }
} 
