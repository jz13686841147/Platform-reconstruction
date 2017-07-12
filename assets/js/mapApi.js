(function() {
    window.BMap_loadScriptTime = (new Date).getTime();
    window.BMap = window.BMap || {};
    window.BMap.apiLoad = function() {
        delete window.BMap.apiLoad;
        if (typeof map_init == "function") {
            map_init()
        }
    }
    ;
    var s = document.createElement('script');
    s.src = 'assets/js/getscript.js';
    document.body.appendChild(s);
})();

