// Smooth Scroll
smoothScroll.init({
    speed: 800,
    easing: 'easeInOutCubic',
    updateURL: false,
    offset: 125
});

// Inject data-scroll attr into footnotes
function footnotesSmoothScroll() {
    var sups = document.getElementsByClassName('footnote-ref');
    var footnotes = document.getElementsByClassName('footnote-backref');
    for (var i = 0; i < sups.length; i++) {
        sups[i].getElementsByTagName('a')[0].setAttribute('data-scroll', '');
        footnotes[i].setAttribute('data-scroll', '');
    }
}

function resize_iframes(){
  var frames = document.getElementsByTagName('iframe');
    for (var i in frames) {
        frames[i].style.width = "100%";
        frames[i].style.height = "400px";
    }
}

function getHeaderLevel(header) {
    return Number(header.nodeName.slice(-1));
}

function createTocMarkup(headers) {
    var prevLevel = 1;
    var output = "";

    headers.forEach(function(h) {
        var currLevel = getHeaderLevel(h);
        if (currLevel > prevLevel) {
            var ranOnce = false;
            while (currLevel > prevLevel) {
                if (ranOnce) {
                    output += "&nbsp;";
                }
                output += "<ol style=\"margin-bottom:0px\"><li>";
                prevLevel += 1;
                ranOnce = true;
            }
        } else if (currLevel == prevLevel) {
            output += "</li><li>";
        } else if (currLevel < prevLevel) {
            while (currLevel < prevLevel) {
                output += "</li></ol>";
                prevLevel -= 1;
            }
            output += "<li>";
        }

        output += `<a href="#${h.id}">${h.innerText}</a>`;
    });

    if (output != "") {
        // Change 2 to the max header level you want in the TOC; in my case, H2
        while (prevLevel >= 2) {
            output += "</li></ol>";
            prevLevel -= 1;
        }
        output = `<h2 class="widget-title">Table of Contents</h2><div style="margin-left:-10px">${output}</div>`;
    }

    return output;
}

function getTocMarkup(document) {
    // I was only interested in the headers within the element that had the .post-content class,
    // which is specific to the Ghost blog. If you're using this elsewhere, or are interested in
    // the entire document, delete this line and use document.querySelectorAll(...) on the next line.
    var body = document.getElementsByClassName('post-content')[0];
    
    // Add or remove header tags you do (or don't) want to include in the TOC
    var headers = body.querySelectorAll('h2, h3, h4, h5, h6');

    // Change the number to 1 if you want headers no matter what.
    // Or if you want at least 3 headers before generating a TOC, change it to 3.
    if (headers.length >= 2) {
        return createTocMarkup(headers);
    } else {
        return "";
    }
}

footnotesSmoothScroll();
hljs.initHighlightingOnLoad();
document.addEventListener('DOMContentLoaded', resize_iframes());
