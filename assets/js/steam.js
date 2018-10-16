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
  var frames = document.getElementByTagName('iframe');
    for (var i in frames) {
        i.style.width = "100%";
        i.style.height = "400px";
    }
}

footnotesSmoothScroll();
hljs.initHighlightingOnLoad();
document.addEventListener('DOMContentLoaded', resize_iframes());
