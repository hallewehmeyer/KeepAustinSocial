var userName;
var containerEl = $(".post-container");

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    userName = data.email;
    $(".member-name").text(data.email);
  });
  // get posts from database
  $.get("/api/posts", function (data) {
    console.log("Posts", data);
    var posts = data;
  }).then(function (response) {
    // display posts to page
    for (var i = 0; i < response.length; i++) {
      populatePosts(response[i]);
    }
  })

  $(document).on('click', '.searchbtn', function (e) {
    var searchInput = $("#searchInput").val()
    var zipCode = $("#zipCode").val()
    var store = "Torchys"
    $.get(`/api/businesses?q=${searchInput}&zip=${zipCode}`).then(data => {
      // 
      console.log(data);
      for (var i = 0; i < data.businesses.length; i++) {
        // for(var i = 0; i < 2; i++){
        var business = data.businesses[i];
      var yelpContainer = $(".yelp-container");
        var businessEl = $("<div>").addClass("card");
        var businessBody = $("<div>").addClass("yelp-card-body");
        var link = $("<a>").attr("href", business.url);
       var businessTitle = $("<div>").addClass("card-title").text(business.name);
        var price = $("<p>").text("Price:" + " " + business.price);
        var rating = $("<p>").text("Rating:" + " " + business.rating);
        var location = $("<p>").text(business.location.address1);
        var image = $("<img>").attr("src", business.image_url).addClass("yelp-pic");
        yelpContainer.append(businessEl);
        businessEl.append(businessBody);
        businessBody.append(businessTitle);
     businessBody.append(image);
      businessBody.append(link);
        businessBody.append(location);
       businessBody.append(rating);
        businessBody.append(price);

      }
    })
  })

  function formData() {
    // send data to database
    var formData = {
      body: $("#textArea").val(),
      location: $("#bar").val(),
      userName: userName
    }
    return formData;
  }
  function populatePosts(data) {
    var formattedDate = moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a");
    var postEl = $(".post-container");
    var cardEl = $("<div>").addClass("card w-75");
    var cardBody = $("<div>").addClass("card-body");
    var cardTitle = $("<h5>").addClass("card-title").text(data.location);
    var cardText = $("<p>").addClass("card-text").text(data.body);
    var newPostUsername = $("<small>").text(data.userName + " " + formattedDate);
    newPostUsername.css({
      float: "right",
      color: "white",
      "margin-top":
        "-10px"
    });
    var cardButton = $("<button>").addClass("btn btn-outline-warning")/*.attr("data-id", data.id)*/;
    $('#svgLikeBttn').last().clone().appendTo(cardButton);
    postEl.append(cardEl);
    cardEl.append(cardBody);
    cardBody.append(cardTitle);
    cardBody.append(cardText);
    cardBody.append(newPostUsername);
    cardBody.append(cardButton);
    // }
  }
  // db posts , username, created_date, location, body
  $(document).on('click', '#post-button', function (event) {
    // html post
    $.ajax({
      type: "POST",
      url: "/api/addpost",
      data: formData()
    }
    ).then(function (data) {
      populatePosts(data);
    }
    );
  });
  // Click event to increase number with like button
  var counter = 0;

  $(document).ready(function () {
    // data attr of id and then click on like 
    $("#likes").click(function (event) {
      var likeBttn = $(event.target)/*.attr()*/;
      counter++;
      likeBttn.text(counter);
      alert("The data-id of clicked item is: " + likentm);
    });
  });

  $(document).on('click', '.dropbtn', function () {
    console.log("test");
  });
});

$(document).on('click', '#logout', function () {
  console.log("test");
})