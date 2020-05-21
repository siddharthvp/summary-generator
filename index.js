/* globals $ */

$('#submit').click(function(e) {
	e.preventDefault();
	var article_name = $('#article').val();
	$('#loading').show();
	$.get('http://localhost:3000/api', {
			article: article_name
		}
	).then(function(response) {
		$('#extract').text(response);
		return $.post('https://en.wikipedia.org/api/rest_v1/transform/wikitext/to/html', {
			wikitext: response, 
			title: article_name,
			body_only: true
		});
	}).then(function(response) {
		$('#parsedextract').html(response.replace(/<script>/i, ''));
		$('#loading').hide();
	}).catch(function() {
		$('#loading').text('Something went wrong :(');
	});
});