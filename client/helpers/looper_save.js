Template.looper_save.helpers({
    isAuthenticated: function() {
        return Session.get('isAuthenticated');
    }
});