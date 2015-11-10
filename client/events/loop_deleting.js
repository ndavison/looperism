Template.loop_deleting.events({
    
    /**
     * Event handlers for dropping a loop button on the 
     * delete area.
     */
    'dragover': function(ev) {
        ev.preventDefault();
    },
    
    'drop div': function(ev, template) {
        ev.preventDefault();
        var loopFileId = ev.originalEvent.dataTransfer.getData('loopfileid');
        template.data.parent.stopPlaying(loopFileId);
        template.data.parent.removeLoop(loopFileId);
    }
    
});