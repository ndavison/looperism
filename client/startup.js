/**
 * The client side Meteor.startup() execution.
 */

Meteor.startup(function () {

    var config = {};
    config.siteRoot = '';    
    config.dropBoxDir = 'looper-audio';
    config.dropboxKey = 'zr16qymzqg21hzf';
    config.oAuthReceiverURL = 'https://' + window.location.hostname + config.siteRoot + '/dropbox-receiver.html';
    Session.set('config', config);
    
    /**
     * Attempt non-interactive authentication on startup.
     */
    DropboxClient = new Dropbox.Client({key: config.dropboxKey});
    DropboxClient.authDriver(new Dropbox.AuthDriver.Popup(
        {receiverUrl: config.oAuthReceiverURL})
    );
    DropboxClient.authenticate({interactive: false}, function(error, client) {
        console.log(error);
        if (client.isAuthenticated()) {
            Session.set('isAuthenticated', true);
            DropboxClient.getUserInfo(function(error, userInfo) {
                console.log(error);
                if (userInfo) {
                    Session.set('userInfo', userInfo);
                }
            });
        }
    });
    
});
