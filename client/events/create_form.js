Template.create_form.events({
    
    /**
     * Handle the file uploads via the create form.
     */
    'change input': function(ev, template) {
        ev.preventDefault();
        var fileEl = $('input[name="looper-file"]');
        
        for (var i = 0; i < fileEl[0].files.length; i++) {
            
            var file = fileEl[0].files[i];
            if (!file.type.match(/^(audio\/(mpeg|wav|)|video\/ogg)/)) {
                console.log('The file ' + file.name + ' was not an audio file! supported formats include WAV, MP3 and OGG.');
                continue;
            }
            
            var reader = new FileReader();
            reader.onload = function(fileEv) {
                var file = this.file;
                var fileMatches = file.name.match(/\.(.*)$/);
                var fileExtension = fileMatches && fileMatches[1] ? fileMatches[1] : '';
                
                var loopFile = {
                    name: '', 
                    loopFileId: Math.random().toString(36).replace(/[^a-z]+/g, ''),
                    data: fileEv.target.result, 
                    fileType: file.type, 
                    fileExtension: fileExtension,
                    howler: null
                };
                
                loopFile.howler = new Howl({
                    src: fileEv.target.result,
                    loop: true,
                    volume: 1,
                    rate: 1,
                    onload: function() {
                        template.data.parent.loopFiles.set(loopFile.loopFileId, loopFile);
                        template.data.parent.isLoadingLoop.set(false);
                    },
                    onloaderror: function(error) {
                        console.log('Howler failed to load the audio file: ' + error);
                        template.data.parent.isLoadingLoop.set(false);
                    }
                });
            };
            
            reader.onerror = function(error) {
                console.log('Failed to read file - please try again.');
            };
            
            template.data.parent.isLoadingLoop.set(true);
            reader.file = file;
            reader.readAsDataURL(file);
        }
    }
    
});