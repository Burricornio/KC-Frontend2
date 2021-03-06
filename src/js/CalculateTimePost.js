const $ = require('jquery');

export default class CalculateTimePost {

    init() {
        // Mostrar tiempo transcurrido
        $('.author__date').each(function(){

        let textDate =  $(this).text();
        let myDate = new Date(textDate);
        let now = new Date();

        let seconds = Math.floor((now - (myDate))/1000);
        let minutes = Math.floor(seconds/60);
        let hours = Math.floor(minutes/60);
        let days = Math.floor(hours/24);

        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

            $(this).mouseenter(function(){

                $(this).text(`${days}d ${hours}h ${minutes}m`)

            }).mouseleave(function(){

                $(this).text(textDate);
            })

        })
    }

}