Template.account.helpers({
    isAuthenticated: function() {
        return Session.get('isAuthenticated');
    },
    getUserInfo: function() {
        return Session.get('userInfo');
    }
});