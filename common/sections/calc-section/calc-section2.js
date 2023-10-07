$(".burger-menu").click(function () {
    $(".menu-items").toggleClass("open");
})

$("#close-banner").click(function(){
    $(".header").css('');
    $("#banner-top").html('');
    return false;
});

$(".calculator input").keyup(function () {
    $(this).val(thousandSeparator($(this).val().replace(/[^0-9]/g, "")));
    var yandex = $("[name='yandex']").val().replace(/\s/g, '');
    var google = $("[name='google']").val().replace(/\s/g, '');
    var priceyandex = $("[name='priceyandex']").val().replace(/\s/g, '');
    var pricegoogle = $("[name='pricegoogle']").val().replace(/\s/g, '');
    //var theme = $(".theme option").prop('selected', true).change().attr('data');
    var theme = "";

    $( ".calculator select option:selected" ).each(function() {
        theme += $( this ).attr('data') + " ";
    });



    if(priceyandex == ''){
        if(theme == undefined){
            resultyandex = (yandex / 100 * theme)*50;
        }else{
            resultyandex = (yandex / 100 * 25)*50;
        }
    }else{
        if(theme == undefined){
            resultyandex = (yandex / 100 * theme)*priceyandex;
        }else{
            resultyandex = (yandex / 100 * 25)*priceyandex;
        }
    }

    if(pricegoogle == ''){
        if(theme == undefined){
            resultgoogle = (google / 100 * theme)*50;
        }else{
            resultgoogle = (google / 100 * 25)*50;
        }
    }else{
        if(theme == undefined){
            resultgoogle = (google / 100 * theme)*pricegoogle;
        }else{
            resultgoogle = (google / 100 * 25)*pricegoogle;
        }
    }



    resultSUM = resultyandex+resultgoogle;
    var sumyear = resultSUM*12

    
    if(sumyear || resultSUM){
        $('.year span').text(thousandSeparator(Math.ceil(sumyear)));
        $('.month span').text(thousandSeparator(Math.ceil(resultSUM)));
    }else{
        $('.year span').text('0');
        $('.month span').text('0');
    }
    
});


$(".calculator select").change(function(){
    var yandex = $("[name='yandex']").val().replace(/\s/g, '');
    var google = $("[name='google']").val().replace(/\s/g, '');

    var priceyandex = $("[name='priceyandex']").val().replace(/\s/g, '');
    var pricegoogle = $("[name='pricegoogle']").val().replace(/\s/g, '');

    var theme = "";
    $( ".calculator select option:selected" ).each(function() {
        theme += $( this ).attr('data') + " ";
    });


    if(priceyandex == ''){
        resultyandex = (yandex / 100 * theme)*50;
    }else{
        resultyandex = (yandex / 100 * theme)*priceyandex;
    }

    if(pricegoogle == ''){
        resultgoogle = (google / 100 * theme)*50;
    }else{
        resultgoogle = (google / 100 * theme)*pricegoogle  
    }


    resultSUM = resultyandex+resultgoogle;
    var sumyear = resultSUM*12

    
    if(sumyear || resultSUM){
        $('.year span').text(thousandSeparator(Math.ceil(sumyear)));
        $('.month span').text(thousandSeparator(Math.ceil(resultSUM)));
    }else{
        $('.year span').text('0');
        $('.month span').text('0');
    }

});

var thousandSeparator = function (str) {
var parts = (str + '').split('.'),
    main = parts[0],
    len = main.length,
    output = '',
    i = len - 1;

while (i >= 0) {
    output = main.charAt(i) + output;
    if ((len - i) % 3 === 0 && i > 0) {
        output = ' ' + output;
    }
    --i;
}

if (parts.length > 1) {
    output += '.' + parts[1];
}
return output;
};




$(".clicklogin").click(function () {
    location.href = 'https://botfaqtor.ru/signin';
    return false;
});

$(".click-project").click(function () {
    var click = "1";
    $(".project-title").toggleClass("is-open");
});

$(document).mouseup(function (e) {
    var div = $(".project-title");
    if (!div.is(e.target) && div.has(e.target).length === 0) {
        div.removeClass("is-open");
    }
});