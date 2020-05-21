/* globals $ */

$('#submit').click(function() {
	$.ajax({
		url: 'https://summary-generator.toolforge.org/api',
		type: 'GET',
		data: {
			article: $('#article').val()
		}
	}).then(function(response) {
		console.log(response);
	});
});