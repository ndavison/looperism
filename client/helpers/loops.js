Template.loops.helpers({
    
    /**
     * Returns the array of loop files in this session's 
     * looper.
     */
    loops: function() {
        
        var fromDropbox = Session.get('loop-files-dropbox');
        var fromForm = Session.get('loop-files-form');
        
        var allLoops = [];
        if (fromDropbox) {
            allLoops = allLoops.concat(fromDropbox);
        }
        if (fromForm) {
            allLoops = allLoops.concat(fromForm);
        }
        
        return allLoops;
    }
    
});