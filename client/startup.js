/**
 * The client side startup.
 */
Meteor.startup(function () {

    /**
     * Attempt non-interactive authentication on startup.
     */
    dropboxClient = new Dropbox.Client({key: config.dropboxKey});
    dropboxClient.authDriver(new Dropbox.AuthDriver.Popup(
        {receiverUrl: config.oAuthReceiverURL})
    );
    dropboxClient.authenticate({interactive: false}, function(error, client) {
        if (error) console.log(error);
        if (client.isAuthenticated()) {
            Session.set('isAuthenticated', true);
            dropboxClient.getUserInfo(function(error, userInfo) {
                if (error) console.log(error);
                if (userInfo) {
                    Session.set('userInfo', userInfo);
                }
            });
        }
    });
    
});
