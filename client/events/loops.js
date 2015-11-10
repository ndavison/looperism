Template.loops.events({
    
    'click button.loop-button': function(ev, template) {
        ev.preventDefault();
        var loopFileId = $(ev.currentTarget).attr('data-loopfileid');
        
        var loops = template.data.parent.loopFiles.get();

        if (loopFileId && loops[loopFileId]) {
            for (var prop in loops) {
                if (loops[prop].howler) loops[prop].howler.stop();
            }
            if (loops[loopFileId].howler) loops[loopFileId].howler.play();
        } else {
            // error
            console.log(loopFileId);
            console.log(_loops);
        }
    },
    
    'dragstart button.loop-button': function(ev, template) {
        ev.originalEvent.dataTransfer.setData('loopfileid', ev.target.getAttribute('data-loopfileid'));
        template.data.parent.isRemovingLoop.set(true);
    },
    
    'dragend button.loop-button': function(ev, template) {
        template.data.parent.isRemovingLoop.set(false);
    }
    
});