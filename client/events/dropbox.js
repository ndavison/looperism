
/**
 * The store for this session's looper files
 */
var loopFiles = [];

Template.load_from_dropbox.events({
    
    /**
     * Event handler for the Use Dropbox! file upload
     * button.
     */
    'click #dropbox-loop': function(ev) {
        ev.preventDefault();
        
        // launch the Dropbox picker so the user can supply a loop from their Dropbox
        Dropbox.choose({multiselect: true, linkType: 'direct', extensions: ['audio'], success: function(files) {
            if (files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    var fileMatches = file.name.match(/\.(.*)$/);
                    var fileExtension = fileMatches && fileMatches[1] ? fileMatches[1] : '';
                    loopFiles.push({name: '', dropboxURL: file.link, fileExtension: fileExtension});
                    Session.set('loop-files', loopFiles);
                }
            }
        }});
    }
    
});