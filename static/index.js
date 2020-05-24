/* globals $ */
console.log('Wikipedia Summary Generator by SD0001');

$('#submit').click(function(e) {
	e.preventDefault();
	var article_name = $('#article').val();
	$('#loading').show();

	$.get('/summary', {
			article: article_name,
			charLimit: 250,
			hardUpperLimit: 500
		}
	).then(function(response) {
		$('#extract').text(response);
		return $.post('https://en.wikipedia.org/api/rest_v1/transform/wikitext/to/html', {
			wikitext: response,
			title: article_name,
			body_only: true
		});
	}).then(function(response) {
		$('#parsedextract').html(response.replace(/<script/i, ''));
		$('#loading').hide();
	}).catch(function() {
		$('#loading').text('Something went wrong :(');
	});
});