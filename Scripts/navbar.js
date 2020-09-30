$(function(){
	/*導覽列高度自適應，導覽列固定才需要*/
    var $nvabar_height = $('.navbar-fixed-top').innerHeight();
	$('body').css("padding-top", $nvabar_height);
	$('#filter-panel').css("top", $nvabar_height);
	$(window).resize(function() {
	  var $nvabar_height = $('.navbar').innerHeight();
	  $('body').css("padding-top", $nvabar_height);
	  $('#filter-panel').css("top", $nvabar_height);
	});	
})

