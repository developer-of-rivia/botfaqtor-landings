$(function () {
    $(".ico-roll-network").click(function () {
        $(".block-roll").toggleClass("open-is");
        return false;
    });
    $(".message-list, .chat-chat-icon").click(function () {
        $(".block-roll").removeClass("open-is");
        return false;
    });

    let rollNetwork = document.querySelector('.roll-network');
    function getScrollPercentage() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let documentHeight = Math.max(
            document.body.scrollHeight, document.body.offsetHeight, document.body.clientHeight,
            document.documentElement.scrollHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight
        );
        return ((scrollTop / (documentHeight - windowHeight)) * 100);
    }
    document.addEventListener("DOMContentLoaded", function() {
        window.onscroll = function() {
            if(getScrollPercentage() > 97){
                rollNetwork.classList.add('roll-network_scrollbottom');
            }
            if(getScrollPercentage() < 97){
                rollNetwork.classList.remove('roll-network_scrollbottom');
            }
        };
    });
});