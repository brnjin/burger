  $(function() {
    $("body").on("click", "#to-Eat", function(event) {
      var id = $(this).data("id");

      var isDevoured = {
        devoured: 1
      };

      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: isDevoured
      }).then(
        function() {
          console.log("Is the burger eaten?", haveEaten);
          location.reload();
        }
      )
    });

  $("body").on("click", "#submit", function(event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $("#nameOfNewBurger").val().trim(),
      devoured: 0
    };

    $.ajax("/api/burgers", {
      type:"POST",
      data: newBurger
    }).then(
      function() {
        console.log("You just cooked up a new burger!");
        location.reload();
      }
    )
  })
});