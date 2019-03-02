$(document).ready(function(){

  $("button").on("click", function () {
console.log($("#location").val());


/*
    var queryURL = "https://api.macys.com/v4/catalog/search?searchphrase=search_keywords" + subject + "&api-key=cdkjnhkyu9mu5k38m8pp62y7";

$.ajax({
    url: queryURL,
    method: "GET"
})

    .then(function(response) {

        console.log(response);

        
        var results = response.response.docs;

        // var results2 = results.map(function(item){
        //     return item.web_url;
        // })

        for (var i=0; i < results.length; i++) {
            var category = results[i].category.main;
            var itemDescription = results[i].description;
            var price = results[i].pricing;
            var clothingUrl = results[i].web_url;

            $(".clothingLister").append(`
                <div class="card mb-3" style="max-width: 760px;">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src="t_logo_291_black.png" class="card-img" alt="macyslogo">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${category}</h5>
                        <p class="card-snip">${itemDescription}</p>
                        <p class="card-auth">${price}</p>
                        <a href="${clothingUrl}">Click Here for Item</a>
                    </div>
                  </div>
                </div>
              </div>`
                );



            
        };
    });
    */
});
});
