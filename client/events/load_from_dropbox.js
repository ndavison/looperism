Template.load_from_dropbox.events({
    
    /**
     * Event handler for the Use Dropbox! file upload
     * button.
     */
    'click #dropbox-loop': function(ev, template) {
        ev.preventDefault();
        
        // launch the Dropbox picker so the user can supply a loop from their Dropbox
        Dropbox.choose({multiselect: true, linkType: 'direct', extensions: ['audio'], success: function(files) {
            if (files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var fileMatches = file.name.match(/\.(.*)$/);
                    var fileExtension = fileMatches && fileMatches[1] ? fileMatches[1] : '';
                    
                    var loopFile = {
                        name: '', 
                        loopFileId: Math.random().toString(36).replace(/[^a-z]+/g, ''),
                        data: null, 
                        dropboxURL: file.link,
                        fileType: file.type, 
                        fileExtension: fileExtension,
                        howler: null
                    };
                    
                    loopFile.howler = new Howl({
                        src: file.link,
                        loop: true,
                        volume: 1,
                        rate: 1,
                        onload: function() {
                            template.data.parent.loopFiles.set(loopFile.loopFileId, loopFile);
                            template.data.parent.isLoadingLoop.set(false);
                        },
                        onloaderror: function(error) {
                            console.log(error);
                            template.data.parent.isLoadingLoop.set(false);
                        }
                    });
                    
                    template.data.parent.isLoadingLoop.set(true);
                }
            }
        }});
    }
    
});