function search(e) {
    if (e.keyCode == 13||e.which == 13) {
        var element = document.getElementById("search");
        var loc = location.href;
        location.href = loc.substring(0, loc.indexOf('#')) + "#" + element.value;
        element.value = "";
    }
}