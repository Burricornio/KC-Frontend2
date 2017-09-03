const $ = require('jquery');

export default class ShowElementOnScroll {
    constructor(element) {
        this.element = element;
    };

    init() {

        var elementScrollTop = $(this.element).position().top;

        $(window).scroll( () => {
            $(this.element).hide();
            var elementHeight= $(this.element).height();
            var scroll = $(window).scrollTop();
            if (scroll >= elementScrollTop - (elementHeight + 100)) {
                $(this.element).show();
            } /*else {
                $(element).hide();
            }*/
        })

    };
}