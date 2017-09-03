const $ = require('jquery');

export default class CalculateTimePost {

    init() {
        // Mostrar tiempo transcurrido
        $('.author__date').each(function(){

        var textDate =  $(this).text();
        var myDate = new Date(textDate);
        var now = new Date();

        var seconds = Math.floor((now - (myDate))/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);

        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

            $(this).mouseenter(function(){

                $(this).text(days + "d " + hours + "h " + minutes + "m")

            }).mouseleave(function(){

                $(this).text(textDate);
            })

        })
    }

}