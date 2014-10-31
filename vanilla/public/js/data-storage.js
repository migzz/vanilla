/**
 * Created by Migz on 6/10/14.
 */

    /**
     *  Handles our cookies and localStorage
     */


    // encapsulate like marionette module
    (function () {

        // declare privately to prevent change of value directly
        var usingLocalStorage = typeof(Storage) !== "undefined";

        return DataStorage =  {

            // use local storage if browser support it
            isLocalStorage : usingLocalStorage,

            //
            set : function (key, value, expire){

                //
                if (this.isLocalStorage) {
                    localStorage.setItem(key, value)
                }

                else {
                    expire = expire || 365000;
                    var date = new Date();
                    date.setTime(date.getTime() + (expire*24*60*60*1000));
                    expire = "expires="+date.toGMTString();
                    document.cookie = key + "=" + value + "; " + expire;
                }
            },

            //
            get : function (key){

                var data = '';
                if (this.isLocalStorage) {
                    return localStorage.getItem(key) || ''
                }

                else {
                    var name    = key + "=",
                        ca      = document.cookie.split(';');

                    for(i = 0; i < ca.length ; i++) {
                        var c = ca[i].trim();
                        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                    }
                    return '';
                }

            },

            //
            remove : function (key){

               if(this.isLocalStorage) {
                   localStorage.removeItem(key)
                }

                else {
                   document.cookie = key + "=" + '' + "; expires="+ new Date('1970-01-01');
               }

            },

            //
            exist : function (key){
                return this.get(key) != null && this.get(key).length > 0
            },

            //
            clear : function (){

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
                localStorage.clear()
            }

        };

    })();
