currentBlock = 1;
bowl = [];
bowlToppings = [];
bowlSauce = [];
bowlExtra = [];
bowlDesc = "";
bowlPrice = 0;

$('.items').click(function(){
    $(this).toggleClass('selected');
})

$('.topping').click(function(){
    $(this).toggleClass('selected');
})

$('.sauce').click(function(){
    $(this).toggleClass('selected');
})

$('.extra').click(function(){
    $(this).toggleClass('selected');
})

addItem = function (item, price)  {

    $("#cartClear").show();
    
    // if (bowl.length < 1) {
    //     $("#block1-choose").html(item);
    // }

    if (currentBlock == 2) {
        Swal.fire({
            title: 'Удвоить протеин?',
            // icon: 'info',
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonColor: 'rgb(77, 89, 166)',
            confirmButtonText: `Да`,
            cancelButtonText: `Нет`,
        }).then((result) => {
            if (result.isConfirmed) {
                item = item + " X2";
                bowl.push(item);
                bowlPrice = bowlPrice + price;
                bowlPrice = bowlPrice + price;
                updateBowl();
                nextBlock();
            } else {
                bowl.push(item);
                bowlPrice = bowlPrice + price;
                updateBowl();
                nextBlock();
            }
        })
    } else {
        bowl.push(item);
        bowlPrice = bowlPrice + price;
        updateBowl();
        nextBlock();
    }

}

addTopping = function (item, price) {
    if ( jQuery.inArray(item, bowlToppings) == -1 ) {
        bowlToppings.push(item);
        bowlPrice = bowlPrice + price;
    } else {
        bowlToppings.splice(jQuery.inArray(item, bowlToppings), 1)
        bowlPrice = bowlPrice - price
    }
    bowl[2] = bowlToppings;
    updateBowl();
}


addSauce = function (item, price) {
    if ( jQuery.inArray(item, bowlSauce) == -1 ) {
        bowlSauce.push(item);
        bowlPrice = bowlPrice + price;
    } else {
        bowlSauce.splice(jQuery.inArray(item, bowlSauce), 1)
        bowlPrice = bowlPrice - price
    }
    
    bowl[3] = bowlSauce;
    updateBowl();
}

addExtra = function (item, price) {
    if ( jQuery.inArray(item, bowlExtra) == -1 ) {
        bowlExtra.push(item);
        bowlPrice = bowlPrice + price;
    } else {
        bowlExtra.splice(jQuery.inArray(item, bowlExtra), 1)
        bowlPrice = bowlPrice - price
    }
    
    bowl[4] = bowlExtra;

    if (!bowl[3]) {
        bowl[3] = ['Нет']
    }
    updateBowl();
}

$("#btnOrder").click(function(){
    order();
})

$("#btnNext").click(function(){
    toppingsFinished();
    $("#btnNext").hide();
})

updateBowl = function() {
    $("#totalSum").html(bowlPrice);

    if (bowlPrice > 0 && bowl.length >2) {

        if (bowl.length == 3) {
            $("#btnOrder").hide();
            $("#btnNext").show();
        }

        if (bowl.length >= 4) {
            $("#btnOrder").show();
        }
        
    }

    if (bowl.length == 1) {
        bowlDesc = "Основа: " + bowl[0];
    }
    if (bowl.length == 2) {
        bowlDesc = "Основа: " + bowl[0] + "<br>" + "Протеин: " + bowl[1]
    }
    if (bowl.length == 3) {
        bowlDesc = "Основа: " + bowl[0] + "<br>" + "Протеин: " + bowl[1] + "<br>" + "Топпинг: " + bowl[2].join(", ");
    }
    if (bowl.length == 4) {
        bowlDesc = "Основа: " + bowl[0] + "<br>" + "Протеин: " + bowl[1] + "<br>" + "Топпинг: " + bowl[2].join(", ") + "<br>" + "Соус: " + bowl[3].join(", ");
    }
    if (bowl.length == 5) {
        bowlDesc = "Основа: " + bowl[0] + "<br>" + "Протеин: " + bowl[1] + "<br>" + "Топпинг: " + bowl[2].join(", ") + "<br>" + "Соус: " + bowl[3].join(", ") + "<br>" + "Экстра: " + bowl[4].join(", ");
    }
    $("#totalOrder").html(bowlDesc);
}

toppingsFinished = function() {
    if (bowlToppings.length !=0) {
        nextBlock();
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Нужно добавить топпинги',
            text: 'Добавьте хотя бы один топпинг',
            confirmButtonText: 'Хорошо'
            })   
    }
};

order = function() {

    customBowlAdd(bowlDesc, bowlPrice);

    Swal.fire({
        title: "Готово",
        icon: "success",
        showDenyButton: true,
        confirmButtonText: 'Меню',
        confirmButtonClass: "btn-block-swal",
        confirmButtonColor: 'rgb(77, 89, 166)',
        denyButtonText: 'Собрать ещё один боул',
        denyButtonClass: "btn-block-swal",
        denyButtonColor: 'rgb(228, 52, 91)'
      }).then((result) => {
        if (result.isConfirmed) {
        location.href="menu.html";
        } else if (result.isDenied) {
          location.href="mix.html";
        }
      })


}

nextBlock = function() {
    currentBlock = currentBlock + 1;
    showBlock(currentBlock);
}

showBlock = function (x) {
    $("#block-1").hide();
    $("#block-2").hide();
    $("#block-3").hide();
    $("#block-4").hide();

    $("#block-"+x).show();

    window.location.hash = "block-"+x;

    $('body,html').animate({
        scrollTop: 0
    }, 400);
}

$(window).bind('hashchange', function () { //detect hash change
    var hash = window.location.hash.slice(1); //hash to string (= "myanchor")
    block = parseInt(hash.split("-")[1]);
    // console.log(block);
    if (currentBlock != block) {
        // showBlock(block);
        
        Swal.fire({
        title: "Хотите начать заново?",
        confirmButtonColor: 'rgb(77, 89, 166)',
        showCancelButton: true,
        confirmButtonText: 'Да',   
        cancelButtonText: "Нет"
    }).then((result) => {
        if (result.value) {
            location.href="mix.html";
        }
    });

    } 

});


refresh = function() {
    currentBlock = 1;
    bowl = [];
    bowlToppings = [];
    bowlSauce = [];
    bowlExtra = [];
    bowlDesc = "Выберите основу и ингредиенты для приготовления боула";
    bowlPrice = 0;

    $(".selected").removeClass("selected");
            
    updateBowl();
    showBlock(1);

    $("#cartClear").hide();
    $("#btnOrder").hide();
    $("#btnNext").hide();

    removeCustomBowls();
}



$("#cartClear").on("click", function () {
    refresh();
});

 //showBlock(4);

    

