$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
		var r = confirm("DIGNIIN hadaad ok riixdo Maqaalku waa tirmayaa DIGNIIN");
		if (r == true) {
       const id = $target.attr('data-id');
				$.ajax({
				  type:'DELETE',
				  url: '/articles/'+id,
				  success: function(response){
				    window.location.href='/Articles';
				  },
				  error: function(err){
				    console.log(err);
				  }
				});
		} else {
        window.location.href='/Articles';
		}
    
  });
});
