var Notes = Ember.Application.create({
});

Notes.Router.map(function(){
    this.resource( 'notes', {path: "/"}, function(){
        this.route( 'note', {path: "/note/:note_id"});
    });
});

Notes.NotesRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('note');
    }
});

Notes.NotesNoteRoute = Ember.Route.extend({
    model: function(note){
        return this.store.find('note', note.note_id);
    }
});

Notes.NotesController = Ember.ArrayController.extend({
    newNoteName: null,
    actions: {
        createNewNote: function(){
            var content = this.get('content');
            var newNoteName = this.get('newNoteName');
            var unique = newNoteName != null && newNoteName.length > 1;

            content.forEach(function(note){
                if(newNoteName === note.get('name')){
                    unique = false; return;
                }
            });

            if(unique){
                var newNote = this.store.createRecord('note', {
                    'id':   newNoteName,
                    'name': newNoteName
                });
                newNote.save();

                this.set('newNoteName', null);
            } else {
                alert('Note must have a unique name of at least 2 characters');
            }
        }
    }
});

Notes.Store = DS.Store.extend({
    adapter: DS.LSAdapter
});

Notes.Note = DS.Model.extend({
    name: DS.attr('string'),
    value: DS.attr('string')
});