(function() {
  jQuery(document).on('turbolinks:load', function() {
    var notes;
    notes = $('#notes');
    if (notes.length > 0) {
      App.global_chat = App.cable.subscriptions.create({
        channel: "LeadsChannel",
        lead_id: notes.data('lead-id')
      }, {
        connected: function() {},
        disconnected: function() {},
        received: function(data) {
          return notes.append(data['note']);
        },
        send_note: function(note, lead_id) {
          return this.perform('send_note', {
            note: note,
            lead_id: lead_id
          });
        }
      });
    }
    return $('#new_note').submit(function(e) {
      var $this, textarea;
      $this = $(this);
      textarea = $this.find('#note_body');
      if ($.trim(textarea.val()).length > 1) {
        App.global_chat.send_note(textarea.val(), notes.data('lead-id'));
        textarea.val('');
      }
      e.preventDefault();
      return false;
    });
  });

}).call(this);
