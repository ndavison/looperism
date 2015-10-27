Template.account.events({
    
    /**
     * Handle the sign-in button click.
     */
    'click #auth-btn': function(ev) {
        ev.preventDefault();
        DropboxClient.authenticate({}, function(error, client) {
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
    },
    
    /**
     * Handle the sign-out button click.
     */
    'click #signout-btn': function(ev) {
        ev.preventDefault();
        DropboxClient.signOut();
        Session.set('isAuthenticated', false);
    }
    
    
});
