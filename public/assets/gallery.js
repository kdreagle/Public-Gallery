$(document).ready(function(){
  $('#add-image').submit(function(event){

    event.preventDefault();

    var form = $('form')[0];
    var formData = new FormData(form);
    $.ajax({
      type: 'POST',
      url: '/gallery',
      contentType: false,
      processData: false,
      data: formData,
      success: function(data){
        location.reload();
      }
    });

    return false;

  });

  $('.image').click(function(event){
    location.replace('/image?id=' + $(this).attr('id'));
  });

  $('#add-image-button').click(function(event){
    $('#add-image').css("display", "inline");
    $('#add-image-button').css("display", "none");
  });

  $('#edit-description').submit(function(event){
    event.preventDefault();

    var description = $('span').text();
    var id = getUrlVars()["id"];
    $.ajax({
      type: 'POST',
      url: '/image?id='+id,
      data: {"description": description}
    });
  });

});


function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
