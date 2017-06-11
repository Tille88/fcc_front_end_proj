$('#get-another-quote-button').on('click', function(e) {
    e.preventDefault();
    $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        $('#quote-author').text(post.title);
        $('#quote-content').html(post.content);
        //
        
        var twitter = post.content.replace(/\s/g, '%20');
        twitter = twitter.replace("<p>", "");
        twitter = twitter.replace("</p>", "");
        twitter = twitter.replace("&#8217;", "'");
        twitter = twitter.replace("&#8230", "...");
        twitter = twitter.replace(";", "");
        twitter += " - " + post.title;
        
        
        
        //
        console.log(twitter);
        //
        
        $("#twitter-share").attr({
        "href" : "https://twitter.com/intent/tweet?text=" + twitter});
        
        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');
        }
      },
      cache: false
    });
  });