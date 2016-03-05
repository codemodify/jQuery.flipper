;
(function ($) {
    var getStyleToAddToTheHeadElement = function () {
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        var isFirefox = typeof InstallTrigger !== 'undefined';
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;
        var isChrome = !!window.chrome && !!window.chrome.webstore;
        var isBlink = (isChrome || isOpera) && !!window.CSS;

        var prefix =
            (isIE || isEdge                  ?     "-ms-" :
            (isFirefox                       ?    "-moz-" :
            (isChrome || isBlink || isSafari ? "-webkit-" : "")));

        var speed = "400ms";

        var theStyle =
            ".Flipper-Container {"              +
            "             perspective: 1000px;" +
                prefix + "perspective: 1000px;" +
            "}"                                 +

            ".Flipper-RorateY-0To180 {"                                 +
            "             animation-name            : RorateY-0To180;"  +
            "             animation-duration        : " + speed + ";"   +
            "             animation-timing-function : ease-out;"        +
                prefix + "animation-name            : RorateY-0To180;"  +
                prefix + "animation-duration        : " + speed + ";"   +
                prefix + "animation-timing-function : ease-out;"        +
            "   display: none;"                                         +
            "}"                                                         +
            ".Flipper-RorateY-180To0 {"                                 +
            "             animation-name            : RorateY-180To0;"  +
            "             animation-duration        : " + speed + ";"   +
            "             animation-timing-function : ease-out;"        +
                prefix + "animation-name            : RorateY-180To0;"  +
                prefix + "animation-duration        : " + speed + ";"   +
                prefix + "animation-timing-function : ease-out;"        +
            "}"                                                         +

            ".Flipper-RorateY-Minus180To0 {"                                +
            "             animation-name            : RorateY-Minus180To0;" +
            "             animation-duration        : " + speed + ";"       +
            "             animation-timing-function : ease-out;"            +
                prefix + "animation-name            : RorateY-Minus180To0;" +
                prefix + "animation-duration        : " + speed + ";"       +
                prefix + "animation-timing-function : ease-out;"            +
            "}"                                                             +
            ".Flipper-RorateY-0ToMinus180 {"                                +
            "             animation-name            : RorateY-0ToMinus180;" +
            "             animation-duration        : " + speed + ";"       +
            "             animation-timing-function : ease-out;"            +
                prefix + "animation-name            : RorateY-0ToMinus180;" +
                prefix + "animation-duration        : " + speed + ";"       +
                prefix + "animation-timing-function : ease-out;"            +
            "   display: none;"                                             +
            "}"                                                             +

            "@keyframes RorateY-0To180 {"                   +
            "   from {"                                     +
            "       transform: rotateY(0deg);"              +
            "   }"                                          +
            "   to {"                                       +
            "       transform: rotateY(180deg);"            +
            "   }"                                          +
            "}"                                             +
            "@" + prefix + "keyframes RorateY-0To180 {"     +
            "   from {"                                     +
                    prefix + "transform: rotateY(0deg);"    +
            "   }"                                          +
            "   to {"                                       +
                    prefix + "transform: rotateY(180deg);"  +
            "   }"                                          +
            "}"                                             +

            "@keyframes RorateY-180To0 {"                   +
            "   from {"                                     +
            "       transform: rotateY(180deg);"            +
            "   }"                                          +
            "   to {"                                       +
            "       transform: rotateY(0deg);"              +
            "   }"                                          +
            "}"                                             +
            "@" + prefix + "keyframes RorateY-180To0 {"     +
            "   from {"                                     +
                    prefix + "transform: rotateY(180deg);"  +
            "   }"                                          +
            "   to {"                                       +
                    prefix + "transform: rotateY(0deg);"    +
            "   }"                                          +
            "}"                                             +

            "@keyframes RorateY-Minus180To0 {"              +
            "   from {"                                     +
            "       transform: rotateY(-180deg);"           +
            "   }"                                          +
            "   to {"                                       +
            "       transform: rotateY(0deg);"              +
            "   }"                                          +
            "}"                                             +
            "@" + prefix + "keyframes RorateY-Minus180To0 {"+
            "   from {"                                     +
                    prefix + "transform: rotateY(-180deg);" +
            "   }"                                          +
            "   to {"                                       +
                    prefix + "transform: rotateY(0deg);"    +
            "   }"                                          +
            "}"                                             +

            "@keyframes RorateY-0ToMinus180 {"              +
            "   from {"                                     +
            "       transform: rotateY(0);"                 +
            "   }"                                          +
            "   to {"                                       +
            "       transform: rotateY(-180deg);"           +
            "   }"                                          +
            "}"                                             +
            "@" + prefix + "keyframes RorateY-0ToMinus180 {"+
            "   from {"                                     +
                    prefix + "transform: rotateY(0);"       +
            "   }"                                          +
            "   to {"                                       +
                    prefix + "transform: rotateY(-180deg);" +
            "   }"                                          +
            "}";

        return theStyle;
    };

    $("head").append("<style>" + getStyleToAddToTheHeadElement() + "</style>");

    $.fn.flipper = function(userOptions) {
        var options = $.extend(
            {
                ContainerId: null,
                FrontId: null,
                BackId: null,
                FlipRight: true
            },
            userOptions
        );

        if(options.ContainerId === null
        || options.FrontId === null
        || options.BackId === null) {
            return this;
        }

        var DoTheFlipY = function (conainerId, frontId, backId) {
            if(!$("#"+frontId).hasClass("Flipper-RorateY-0To180")) {
                $("#"+conainerId).removeClass("Flipper-Container");
                $("#"+conainerId).addClass("Flipper-Container");

                $("#"+frontId).removeClass("Flipper-RorateY-0To180");
                $("#"+frontId).removeClass("Flipper-RorateY-180To0");

                $("#"+backId).removeClass("Flipper-RorateY-Minus180To0");
                $("#"+backId).removeClass("Flipper-RorateY-0ToMinus180");

                $("#"+frontId).addClass("Flipper-RorateY-0To180");
                $("#"+backId).addClass("Flipper-RorateY-Minus180To0");
            }
        };
        var DoTheFlipYReverese = function (conainerId, frontId, backId) {
            if(!$("#"+frontId).hasClass("Flipper-RorateY-180To0")) {
                $("#"+conainerId).removeClass("Flipper-Container");
                $("#"+conainerId).addClass("Flipper-Container");

                $("#"+frontId).removeClass("Flipper-RorateY-0To180");
                $("#"+frontId).removeClass("Flipper-RorateY-180To0");

                $("#"+backId).removeClass("Flipper-RorateY-Minus180To0");
                $("#"+backId).removeClass("Flipper-RorateY-0ToMinus180");

                $("#"+frontId).addClass("Flipper-RorateY-180To0");
                $("#"+backId).addClass("Flipper-RorateY-0ToMinus180");
            }
        };

        if (options.FlipRight === true) {
            DoTheFlipY(options.ContainerId, options.FrontId, options.BackId);
        }
        else {
            DoTheFlipYReverese(options.ContainerId, options.FrontId, options.BackId);
        }

        return this;
     };
}(jQuery));
