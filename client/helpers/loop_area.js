Template.loop_area.onCreated(function() {
    
    /**
     * A ReactiveObj instance for the loop files 
     * uploaded via the create_form or load_from_dropbox 
     * templates.
     */
    this.loopFiles = new ReactiveObj(null);
    
    /**
     * A ReactiveVar instance that contains the loop file 
     * id that the user is attempting to remove.
     */
    this.isRemovingLoop = new ReactiveVar(null);
    
    /**
     * A ReactiveVar instance that determines whether a 
     * loop file is currently loading.
     */
    this.isLoadingLoop = new ReactiveVar(null);
    
    /**
     * Stops a loop playing.
     */
    this.stopPlaying = function(loopId) {
        if (loopId) {
            var loops = this.loopFiles.get();
            for (var prop in loops) {
                if (prop == loopId && loops[prop].howler) {
                    loops[prop].howler.stop();
                }
            }
        }
    };
    
    /**
     * Nulls a loop from the ReactiveObj.
     */
    this.removeLoop = function(loopId) {
        if (loopId) {
            this.loopFiles.set(loopId, {});
        }
    };
});

Template.loop_area.helpers({
    
    /**
     * Returns the array of loop files in this session's 
     * looper.
     */
    getLoops: function() {
        var loops = [];
        if (Template.instance().loopFiles.get()) {
            for (var prop in Template.instance().loopFiles.get()) {
                loops.push(Template.instance().loopFiles.get()[prop]);
            }
        }
        return loops;
    },
        
    /**
     * Returns the value of the isLoadingLoop ReactiveVar.
     */
    isLoadingLoop: function() {
        return Template.instance().isLoadingLoop.get();
    },
    
    /**
     * Returns the value of the isRemovingLoop ReactiveVar.
     */
    isRemovingLoop: function() {
        return Template.instance().isRemovingLoop.get();
    },
    
    /**
     * Returns the template instance.
     */
    getSelf: function() {
        return Template.instance();
    }
    
});