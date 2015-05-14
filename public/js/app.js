"use strict";
var OrderApp = (function () {
  
    // var ordersResult;
    var id = 0;

    //parse jade to html 
    //container-where exactly to add parsed html
    //fileName-views/cart-items.jade
    //data-variables in dictionary {cart: cart}
    function displayWithJade(container, fileName, data){
        return Q($.get(fileName)).then(function(jadeString){
            var renderedHtml = jade.render(jadeString, data);
            container.html(renderedHtml);
        })
    }

    //set where to add content and get data from local storage
    var displayCart = function() {
        var container = $("#cartItems tbody");
        container.empty();

        //Get cart data from local storage
        var cart = JSON.parse(sessionStorage.getItem("cart"));
        //Display cart items
        displayWithJade(container, "views/cart-items.jade",{
            cart: cart
        });

        // $.ajax({
        //     "method": "get",
        //     "url": "http://localhost:3000/api/orders",
        //     "dataType": "json"
        // }).done(function (result) {
        //     ordersResult = result;
        //     for (var order in ordersResult) {
        //         if (ordersResult[order] != null) {
        //             container.append("<tr.success><td.col-xs-8>" + ordersResult[order].name +
        //             "</td><td.col-xs-3>" + ordersResult[order].price +
        //             "</td><td.col-xs-1>span.glyphicon.glyphicon-remove</td>");
        //             var actions = $('.btn_actions_' + order);

        //             $('#btn_delete_' + order).click(function (target) {
        //                 var id = event.target.getAttribute('data-id');
        //                 deleteorder(id);
        //             });
        //         }
        //     }
        // })
    }

    var removeItemFromCart = function(id) {
        var cart = JSON.parse(sessionStorage.getItem("cart"));

        for (var i=0;i<cart.items.length;i++){
            if (cart.items[i].id === id){
                cart.items.splice(i,1);
            }
        }

        sessionStorage.setItem("cart", JSON.stringify(cart));
        
        // $.ajax({
        //     "method": "delete",
        //     "url": "http://localhost:3000/api/orders/" + id,
        //     "dataType": "json"
        // }).done(function (result) {
        //     displayResults();
        // })
    }

    var update = function(id, name, email) {
        $.ajax({
            "method": "put",
            "url": "http://localhost:3000/api/orders/" + id,
            "data": {
                "name": name,
                "email": email
            },
            "dataType": "json"
        }).done(function (result) {
            displayResults();
        })
    }

    var addItemToCart = function(name, price) {
        var cart = JSON.parse(sessionStorage.getItem("cart"));
        id++;
        if (cart === null) {
            id=0;
            cart = {
                items: []
            }
        };

        cart.items.push({
            id: id,
            name: name,
            price: price
        })

        sessionStorage.setItem("cart", JSON.stringify(cart));

        // $.ajax({
        //     "method": "post",
        //     "url": "http://localhost:3000/api/orders",
        //     "data": {
        //         "id": id,//ordersResult.length,
        //         "name": name,
        //         "price": price
        //     },
        //     "dataType": "json"
        // }).done(function (result) {
        //     $(".orderText").text("");
        //     $(".orderPrice").text("");
        // })

    }
    return {
        displayCart: displayCart,
        removeItemFromCart: removeItemFromCart,
        update: update,
        addItemToCart: addItemToCart
    };
})();
