function progress() {
    var bar = $('.bar');
    var percent = $('.percent');
    var status = $('#status');
    $('.fupload').ajaxForm({
        beforeSend: function() {
            status.empty();
            var percentVal = '0%';
            bar.width(percentVal);
            percent.html(percentVal);
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal);
            percent.html(percentVal);
        },
        complete: function(xhr) {

            swal("Book Added Successfully!", "Added!", "success");
        }

    });
}
progress();