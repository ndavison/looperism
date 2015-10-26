Template.loops.helpers({
    
    /**
     * Returns the array of loop files in this session's 
     * looper.
     */
    loops: function() {
        return Session.get('loop-files');
    }
    
});