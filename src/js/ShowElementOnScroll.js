const $ = require('jquery');

export default class ShowElementOnScroll {
    constructor(element) {
        this.element = element;
    };

    init() {

        let elementScrollTop = $(this.element).position().top;
        

        $(window).scroll( () => {
            $(this.element).hide();
            let elementHeight= $(this.element).height();
            let scroll = $(window).scrollTop();
            if (scroll >= elementScrollTop - (elementHeight + 100)) {
                $(this.element).show();
            } /*else {
                $(element).hide();
            }*/
        })

    };
}