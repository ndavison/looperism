Template.account.events({
    
    /**
     * Handle the sign-in button click.
     */
    'click #auth-btn': function(ev) {
        ev.preventDefault();
        dropboxClient.authenticate({}, function(error, client) {
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
    },
    
    /**
     * Handle the sign-out button click.
     */
    'click #signout-btn': function(ev) {
        ev.preventDefault();
        dropboxClient.signOut();
        Session.set('isAuthenticated', false);
    }
    
    
});
