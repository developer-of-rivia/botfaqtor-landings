// roll-network
let icoRollNetwork = document.querySelector('.ico-roll-network');
let blockRoll = document.querySelector('.block-roll');
let messageList = document.querySelector('.message-list');
let chatChatIcon = document.querySelector('.chat-chat-icon');

icoRollNetwork.addEventListener('click', function () {
    blockRoll.classList.toggle("open-is");
    return false;
});
messageList.addEventListener('click', function () {
    blockRoll.classList.remove("open-is");
    return false;
});
chatChatIcon.addEventListener('click', function () {
    blockRoll.classList.remove("open-is");
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


// Begin Verbox {literal}
(function (d, w, m) {
    window.supportAPIMethod = m;
    var s = d.createElement("script");
    s.type = "text/javascript";
    s.id = "supportScript";
    s.charset = "utf-8";
    s.async = true;
    var id = "fa8d6ba2fa033b89a545e3d9db332dae";
    s.src = "https://admin.verbox.ru/support/support.js?h=" + id;
    var sc = d.getElementsByTagName("script")[0];
    w[m] =
        w[m] ||
        function () {
            (w[m].q = w[m].q || []).push(arguments);
        };
    if (sc) sc.parentNode.insertBefore(s, sc);
    else d.documentElement.firstChild.appendChild(s);
})(document, window, "Verbox");
// {/literal} End Verbox