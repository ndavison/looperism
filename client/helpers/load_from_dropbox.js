Template.load_from_dropbox.helpers({
    isAuthenticated: function() {
        return Session.get('isAuthenticated');
    }
});