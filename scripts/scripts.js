$(document).ready(function() {
    var readingTime = {};
    var current = 0;
    var page = ["#main"];
    var mainPagePosition = 0;

    readingTime["start"] = Date.now();

    $("#main").removeClass("hide");

    $(document).on("click", "a", function(e) {
        e.preventDefault();
        $("body, a, button").addClass("loading");
        $(this).css("color", "#551A8B");

        readingTime[Date.now()] = $(this).attr("href");
        mainPagePosition = (($(this).attr("href") != "#h1-3-1") && ($(this).attr("href") != "#h2-4-1") ? $(document).scrollTop() : mainPagePosition);

        page.splice(++current, 2, $(this).attr("href"));

        $("#back").removeAttr("disabled");

        if (current + 1 >= page.length) {
            $("#next").attr("disabled", "true");
        }

        setTimeout(function(){
            $("main > div").addClass("hide");
            $(page[current]).removeClass("hide");
            $("body, a, button").removeClass("loading");
        }, 800);
    });

    $(document).on("click", "#back", function() {
        $("main > div").addClass("hide");
        $(page[--current]).removeClass("hide");

        readingTime[Date.now()] = page[current];

        if (current == 0) {
            $("#back").attr("disabled", "true");
        }

        if (current < page.length - 1) {
            $("#next").removeAttr("disabled");
        }

        $(document).scrollTop(mainPagePosition);
    });

    $(document).on("click", "#next", function() {
        $("main > div").addClass("hide");
        $(page[++current]).removeClass("hide");

        readingTime[Date.now()] = page[current];

        $("#back").removeAttr("disabled");

        if (current + 1 >= page.length) {
            $("#next").attr("disabled", "true");
        }
    });

    //TODO Handle InvalidStateError e IndexSizeError
    $(document).on("click", "#bold", function() {
        window.getSelection().getRangeAt(0).surroundContents(document.createElement("b"));
    });

    $(document).on("click", "#underline", function() {
        window.getSelection().getRangeAt(0).surroundContents(document.createElement("u"));
    });

    $(document).on("click", "#exit", function() {
        readingTime["end"] = Date.now();

        var text = JSON.stringify(readingTime);
        var hiddenElement = document.createElement("a");

        hiddenElement.href = "data:attachment/text," + encodeURI(text);
        hiddenElement.target = "_blank";
        hiddenElement.download = "taskTime" + Date.now() + ".txt";

        hiddenElement.click();

        location.href = "/instrumento/";
    });

    // Prevent the backspace key from navigating back.
    // http://stackoverflow.com/questions/1495219/how-can-i-prevent-the-backspace-key-from-navigating-back
    $(document).unbind('keydown').bind('keydown', function (event) {
        var doPrevent = false;
        if (event.keyCode === 8) {
            var d = event.srcElement || event.target;
            if ((d.tagName.toUpperCase() === 'INPUT' &&
                    (
                    d.type.toUpperCase() === 'TEXT' ||
                    d.type.toUpperCase() === 'PASSWORD' ||
                    d.type.toUpperCase() === 'FILE' ||
                    d.type.toUpperCase() === 'SEARCH' ||
                    d.type.toUpperCase() === 'EMAIL' ||
                    d.type.toUpperCase() === 'NUMBER' ||
                    d.type.toUpperCase() === 'DATE' )
                ) ||
                d.tagName.toUpperCase() === 'TEXTAREA') {
                doPrevent = d.readOnly || d.disabled;
            }
            else {
                doPrevent = true;
            }
        }

        if (doPrevent) {
            event.preventDefault();
        }
    });
});
