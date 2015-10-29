/**
 * The store for this session's looper files from the form.
 */
var loopFiles = [];

Template.create_form.events({
    
    /**
     * Handle the file uploads via the create form.
     */
    'change input': function(ev) {
        ev.preventDefault();
        var fileEl = $('input[name="looper-file"]');
        
        for (var i = 0; i < fileEl[0].files.length; i++) {
            var file = fileEl[0].files[i];
            if (!file.type.match(/^(audio\/(mpeg|wav|)|video\/ogg)/)) {
                console.log('The file ' + file.name + ' was not an audio file! supported formats include WAV, MP3 and OGG.');
                continue;
            }
            var reader = new FileReader();
            reader.onload = function(ev) {
                var file = this.file;
                var fileMatches = file.name.match(/\.(.*)$/);
                var fileExtension = fileMatches && fileMatches[1] ? fileMatches[1] : '';
                loopFiles.push({name: '', data: ev.target.result, fileType: file.type, fileExtension: fileExtension});
                Session.set('loop-files-form', loopFiles);
            };
            reader.onerror = function(error) {
                console.log('Failed to read file - please try again.');
            };
            reader.file = file;
            reader.readAsDataURL(file);
        }
    }
    
});