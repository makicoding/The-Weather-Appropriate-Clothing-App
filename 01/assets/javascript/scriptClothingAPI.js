$(document).ready(function() {
    
    // query the Macy's API
    var queryURL = "http://api.macys.com/v3/catalog/category/118/browseproducts";

    // build an object to contain our QPI call's query parameters
    // set API key
    var queryParams = {"api-key": "Wls01QSONRkQQ34WHiHBXKAXicZxYLcG"};

    // ajax call
    $.ajax({
        url: queryURL,
        method:"GET"
    
    // logic for category pull goes here


    // pull category items (limit 3)
    }).then(function(response) {

    })

});