/**
 * Created by Migz on 6/3/14.
 */

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    function clearCookies() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var spcook = cookies[i].split("=");
            deleteCookie(spcook[0]);
        }
        function deleteCookie(cookiename) {
            var d = new Date(0);
            var expires = ";expires=" + d;
            var name = cookiename;
            //alert(name);
            var value = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        }
        //window.location = ""; // TO REFRESH THE PAGE
    }
