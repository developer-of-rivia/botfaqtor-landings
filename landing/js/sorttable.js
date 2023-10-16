
var table = $('.f table');

$('.f th')
    .each(function () {

        var th = $(this),
            thIndex = th.index(),
            inverse = false;

        th.click(function () {

            table.find('td').filter(function () {

                return $(this).index() === thIndex;

            }).sortElements(function (a, b) {

                var strDate = $.text([a]);
                var dateParts = strDate.split(".");
                var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
                var a1 = date.getTime();
                strDate = $.text([b]);
                dateParts = strDate.split(".");
                date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
                b1 = date.getTime();

                return a1 > b1 ?
                    inverse ? -1 : 1
                    : inverse ? 1 : -1;

            }, function () {

                // parentNode is the element we want to move
                return this.parentNode;

            });

            inverse = !inverse;

        });

    });