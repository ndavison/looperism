Template.account.helpers({
    isAuthenticated: function() {
        return Session.get('isAuthenticated');
    }
});