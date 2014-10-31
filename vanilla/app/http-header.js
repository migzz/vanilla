/**
 * Created by Migz on 6/10/14.
 */
    /**
     *      Http Headers
     */

    define (['md5'], function (CryptoJS) {

        // basic hasher
        window.hash = function (s){
            return CryptoJS.MD5(''+s).toString();
        };

        //
        return vanilla.app.module('Request', function(Request) {

            //
            Request.options = {
                url             : aurora.url + '/branches/list',
                timeStamp       : new Date().toISOString(),
                apiID           : 12345678901234,
                secretKey       : '0B161A3F8CA81D127FFCBD651B46C6C5',
                targetBranch    : '',
                accessToken     : ''
            };


            // Hash data
            Request.hash = function(options) {

                var securityHash = options.url +
                    options.timeStamp +
                    options.apiID +
                    options.secretKey;

                // Encrypt data
                securityHash = CryptoJS.MD5(securityHash).toString();

                // Return it as string
                return securityHash;

            };

            // Call ajaxSetup and hash
            Request.token = function (options) {

                options = options || Request.options;
                options.timeStamp = new Date().toISOString();
                options.accessToken = DataStorage.get('token');

                // Set ajax setup
                $.ajaxSetup({
                    crossDomain : true,
                    headers : {
                        'Request-Url'         : options.url,
                        'Request-Date'        : options.timeStamp,
                        'Api-Id'              : options.apiID,
                        'Request-Signature'   : Request.hash(
                            options
                        ),
                        'Target-Branch'       : options.targetBranch,
                        'Access-Token'       : options.accessToken

                    }
                });

            };

            // Set initial ajax header
            Request.token();

        }); //

    });