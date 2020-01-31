
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '&key=AIzaSyB_7eeOwD6oWHg57eXZHDuHL969C9gl-tE';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">')

    

    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +
    cityStr + '&sort=newest&api-key=e99a7dab0c444035998ba041e8703263'
    $.getJSON(nytimesUrl, function(data){
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length-4; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' +article.web_url+'">' + article.headline.main+ '</a>' +
                '<p>' + article.snippet + '</p>' + '</li>');
        }
    }).error(function(e){
        $nytHeaderElem.text('NYT Articles Could Not Be Loaded');
    });


    // Wiki Ajax request goes here
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr+ 
    '&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wiki resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {

            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
