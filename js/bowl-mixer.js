currentBlock = 1;
bowl = [];
bowlOsnova = [];
bowlProtein = [];
bowlToppings = [];
bowlSauce = [];
bowlExtra = [];
bowlDesc = "";
bowlPrice = 0;


addModif2 =function(item, category, price) {

    itemRep = item.replace(" ", "_");
    val = parseInt( $("#modifCounter-"+itemRep).html() );
    val = val + 1;
    $("#modifCounter-"+itemRep).html(val);

    
    if (category == "proteins") {
        bowlProtein.splice(jQuery.inArray(item, bowlProtein), 1); 
        bowlProtein.push(item+" X"+val);
        bowlPrice = bowlPrice + price;
        bowl[1] = bowlProtein;
    }

    if (category == "topping") {
        bowlToppings.splice(jQuery.inArray(item, bowlToppings), 1); 
        bowlToppings.push(item+" X"+val);
        bowlPrice = bowlPrice + price;
        bowl[2] = bowlToppings;
    }

    if (category == "sauce") {
        bowlSauce.splice(jQuery.inArray(item, bowlSauce), 1); 
        bowlSauce.push(item+" X"+val);
        bowlPrice = bowlPrice + price;
        bowl[3] = bowlSauce;
    }

    if (category == "extra"){
        bowlExtra.splice(jQuery.inArray(item, bowlExtra), 1); 
        bowlExtra.push(item+" X"+val);
        bowlPrice = bowlPrice + price;
        bowl[4] = bowlExtra;
    }

    updateBowl();
    
}

removeModif2 = function(item, category, price) {
    itemRep = item.replace(" ", "_");

    val = parseInt( $("#modifCounter-"+itemRep).html() );
    val = val - 1;
    $("#modifCounter-"+itemRep).html(val);

    if (category == "proteins") {
        if (val > 0) {
            bowlProtein.splice(jQuery.inArray(item, bowlProtein), 1);
            bowlProtein.push(item+" X"+val);
            bowlPrice = bowlPrice - price;
            bowl[1] = bowlProtein;
        } else {
            bowlProtein.splice(jQuery.inArray(item, bowlProtein), 1);
            bowlPrice = bowlPrice - price;
            bowl[1] = bowlProtein;
            $("#modificator-"+itemRep).prev().removeClass("selected");
            $("#modificator-"+itemRep).remove();
        }
    }

    if (category == "topping") {
        if (val > 0) {
            bowlToppings.splice(jQuery.inArray(item, bowlToppings), 1); 
            bowlToppings.push(item+" X"+val);
            bowlPrice = bowlPrice - price;
            bowl[2] = bowlToppings;
        } else {
            bowlToppings.splice(jQuery.inArray(item, bowlToppings), 1);             
            bowlPrice = bowlPrice - price;
            bowl[2] = bowlToppings;
            $("#modificator-"+itemRep).prev().removeClass("selected");
            $("#modificator-"+itemRep).remove();
        }
    }

    if (category == "sauce") {
        if (val > 0) {
            bowlSauce.splice(jQuery.inArray(item, bowlSauce), 1); 
            bowlSauce.push(item+" X"+val);
            bowlPrice = bowlPrice - price;
            bowl[3] = bowlSauce;
        } else {
            bowlSauce.splice(jQuery.inArray(item, bowlSauce), 1);             
            bowlPrice = bowlPrice - price;
            bowl[3] = bowlSauce;
            $("#modificator-"+itemRep).prev().removeClass("selected");
            $("#modificator-"+itemRep).remove();
        }
    }
    
    if (category == "extra"){
        if (val > 0) {
            bowlExtra.splice(jQuery.inArray(item, bowlExtra), 1); 
            bowlExtra.push(item+" X"+val);
            bowlPrice = bowlPrice - price;
            bowl[4] = bowlExtra;
        } else {
            bowlExtra.splice(jQuery.inArray(item, bowlExtra), 1);
            bowlPrice = bowlPrice - price;
            bowl[4] = bowlExtra;
            $("#modificator-"+itemRep).prev().removeClass("selected");
            $("#modificator-"+itemRep).remove();
        }
    }

    updateBowl();

}

addProtein = function (item, price, e)  {

    itemRep = item.replace(" ", "_");
    
    if ( $("#modifCounter-"+itemRep).html() == undefined ) {

        $(e).addClass('selected');

        category = $(e).parent()[0].classList[0]; 
    
    
        if ( jQuery.inArray(item, bowlProtein) == -1 ) {
            bowlProtein.push(item);
            bowlPrice = bowlPrice + price;

            modifHTML = `
            <span class="modificator" id="modificator-${itemRep}">
                <span onclick="removeModif2('${item}', '${category}', ${price})">-</span>
                <span class="modifCounter" id="modifCounter-${itemRep}">1</span>
                <span onclick="addModif2('${item}', '${category}', ${price})">+</span>
            </span>
            `
            $(e).parent().append(modifHTML);


        } else {
            // bowlProtein.splice(jQuery.inArray(item, bowlProtein), 1)
            // bowlPrice = bowlPrice - price
            
        }

    }

    bowl[1] = bowlProtein;
    updateBowl();

}

////////////
addOsnova = function (item, price, e)  {

    try {
        a = modifCounter;
    } catch (error) {
        modifCounter = 0;
    }
    

    $(e).parent().addClass('selected');
    
    $("#cartClear").show();

    switch (item) {
        case "??????":
            $("#button-1").removeClass("disabled");
            $("#button-2").addClass("disabled");
            $("#button-3").addClass("disabled");
        break;
        case "??????????":
            $("#button-1").addClass("disabled");
            $("#button-2").removeClass("disabled");
            $("#button-3").addClass("disabled");
        break;
        case "???????? ????????-????????????????":
            $("#button-1").addClass("disabled");
            $("#button-2").addClass("disabled");
            $("#button-3").removeClass("disabled");
        break;
    }

    if ( jQuery.inArray(item, bowlOsnova) == -1 && modifCounter<=1) {
    
        bowlOsnova.push(item);
        bowlPrice = bowlPrice + price;

        modifCounter = 1;
        
        item2 = item.replace(" ", "_");

        modifHTML = `
        <span class="modificator">
            <span onclick="removeModif('${item}')">-</span>
            <span class="modifCounter" id="modifCounter-${item2}">${modifCounter}</span>
            <span onclick="addModif('${item}')">+</span>
          </span>
        `
        $(e).parent().append(modifHTML);

    } else {
        removeOsnova();
    }
    
    addModif =function(item) {
        modifCounter = modifCounter + 1;
        
        bowlOsnova.splice(jQuery.inArray(item, bowlOsnova), 1)
        bowlOsnova.push(item+" X"+modifCounter);
        bowlPrice = bowlPrice + price;
        
        $("#modifCounter-"+item2).html(modifCounter);

        bowl[0] = bowlOsnova;
        updateBowl();
    }

    removeModif =function(item) {
        modifCounter = modifCounter - 1;
        if (modifCounter > 0) {
            bowlOsnova.splice(jQuery.inArray(item, bowlOsnova), 1)
            bowlOsnova.push(item+" X"+modifCounter);
            bowlPrice = bowlPrice - price
            
            $("#modifCounter-"+item2).html(modifCounter);
            
        } else {
            
            removeOsnova();
        }

        bowl[0] = bowlOsnova;
        updateBowl();
    }


    removeOsnova = function() {
        modifCounter = 0;
        bowlOsnova = [];
        
        bowlPrice = 0;
        $("#button-1").removeClass("disabled");
        $("#button-2").removeClass("disabled");
        $("#button-3").removeClass("disabled");
        
        $(".modificator").hide();

        $(e).parent().removeClass('selected');
        
    }

    bowl[0] = bowlOsnova;
    updateBowl();
    
    if (bowlOsnova.length == 0) {
        $("#btnNext").hide();
    }

}
//////







addTopping = function (item, price, e) {
    itemRep = item.replace(" ", "_");


    if ( $("#modifCounter-"+itemRep).html() == undefined ) {

        $(e).addClass('selected');

        category = $(e).parent()[0].classList[0]; 
    
        if ( jQuery.inArray(item, bowlToppings) == -1 ) {
            bowlToppings.push(item);
            bowlPrice = bowlPrice + price;
            

            modifHTML = `
            <span class="modificator" id="modificator-${itemRep}">
                <span onclick="removeModif2('${item}', '${category}', ${price})">-</span>
                <span class="modifCounter" id="modifCounter-${itemRep}">1</span>
                <span onclick="addModif2('${item}', '${category}', ${price})">+</span>
            </span>
            `
            $(e).parent().append(modifHTML);


        } else {
            //     bowlToppings.splice(jQuery.inArray(item, bowlToppings), 1)
            //     bowlPrice = bowlPrice - price
            
        }

    }

    bowl[2] = bowlToppings;
    updateBowl();

}


addSauce = function (item, price, e) {
    itemRep = item.replace(" ", "_");

    if ( $("#modifCounter-"+itemRep).html() == undefined ) {

        $(e).addClass('selected');

        category = $(e).parent()[0].classList[0]; 
    
    
        if ( jQuery.inArray(item, bowlSauce) == -1 ) {
            bowlSauce.push(item);
            bowlPrice = bowlPrice + price;

            modifHTML = `
            <span class="modificator" id="modificator-${itemRep}">
                <span onclick="removeModif2('${item}', '${category}', ${price})">-</span>
                <span class="modifCounter" id="modifCounter-${itemRep}">1</span>
                <span onclick="addModif2('${item}', '${category}', ${price})">+</span>
            </span>
            `
            $(e).parent().append(modifHTML);


        } else {
            //     bowlToppings.splice(jQuery.inArray(item, bowlToppings), 1)
            //     bowlPrice = bowlPrice - price
            
        }

    }

    bowl[3] = bowlSauce;
    updateBowl();

}

addExtra = function (item, price, e) {
    itemRep = item.replace(" ", "_");


    if ( $("#modifCounter-"+itemRep).html() == undefined ) {

        $(e).addClass('selected');

        category = $(e).parent()[0].classList[0]; 
    
    
        if ( jQuery.inArray(item, bowlExtra) == -1 ) {
            bowlExtra.push(item);
            bowlPrice = bowlPrice + price;

            modifHTML = `
            <span class="modificator" id="modificator-${itemRep}">
                <span onclick="removeModif2('${item}', '${category}', ${price})">-</span>
                <span class="modifCounter" id="modifCounter-${itemRep}">1</span>
                <span onclick="addModif2('${item}', '${category}', ${price})">+</span>
            </span>
            `
            $(e).parent().append(modifHTML);


        } else {
            //     bowlToppings.splice(jQuery.inArray(item, bowlToppings), 1)
            //     bowlPrice = bowlPrice - price
            
        }

    }

    bowl[4] = bowlExtra;

    if (!bowl[3]) {
        bowl[3] = ['??????']
    }
    updateBowl();


}

$("#btnOrder").click(function(){
    order();
})

$("#btnNext").click(function(){
    //toppingsFinished();
    $("#btnNext").hide();
    nextBlock();
})

updateBowl = function() {
    $("#totalSum").html(bowlPrice);

    $("#btnNext").show();

    
    if (currentBlock == 1) {
        bowlDesc = "????????????: " + bowl[0];
        if (bowl[0] == undefined || bowl[0].length == 0) {
            bowlDesc = "???????????????? ???????????? ?? ?????????????????????? ?????? ?????????????????????????? ??????????";
            $("#btnNext").hide();
        }
        
    }
    if (currentBlock == 2) {
        bowlDesc = "????????????: " + bowl[0] + "<br>" + "??????????????: " + bowl[1]
    }
    if (currentBlock == 3) {
        bowlDesc = "????????????: " + bowl[0] + "<br>" + "??????????????: " + bowl[1] + "<br>" + "??????????????: " + bowl[2].join(", ");
    }
    if (currentBlock == 4) {
        $("#btnNext").hide();
        $("#btnOrder").show();

        bowlDesc = "????????????: " + bowl[0] + "<br>" + "??????????????: " + bowl[1] + "<br>" + "??????????????: " + bowl[2].join(", ") + "<br>" + "????????: " + bowl[3].join(", ");
        
        if (bowl[4]) {
            bowlDesc = "????????????: " + bowl[0] + "<br>" + "??????????????: " + bowl[1] + "<br>" + "??????????????: " + bowl[2].join(", ") + "<br>" + "????????: " + bowl[3].join(", ") + "<br>" + "????????????: " + bowl[4].join(", ");    
        }
    
    }
    
    $("#totalOrder").html(bowlDesc);
}

toppingsFinished = function() {
    if (bowlToppings.length !=0) {
        nextBlock();
    } else {
        Swal.fire({
            icon: 'warning',
            title: '?????????? ???????????????? ????????????????',
            text: '???????????????? ???????? ???? ???????? ??????????????',
            confirmButtonText: '????????????'
            })   
    }
};

order = function() {

    customBowlAdd(bowlDesc, bowlPrice);
    ym(80321737,'reachGoal','bowl-make');

    Swal.fire({
        title: "????????????",
        icon: "success",
        showDenyButton: true,
        confirmButtonText: '????????',
        confirmButtonClass: "btn-block-swal",
        confirmButtonColor: 'rgb(77, 89, 166)',
        denyButtonText: '?????????????? ?????? ???????? ????????',
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
        title: "???????????? ???????????? ?????????????",
        confirmButtonColor: 'rgb(77, 89, 166)',
        showCancelButton: true,
        confirmButtonText: '????',   
        cancelButtonText: "??????"
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
    bowlOsnova = [];
    bowlProtein = [];
    bowlToppings = [];
    bowlSauce = [];
    bowlExtra = [];
    bowlDesc = "???????????????? ???????????? ?? ?????????????????????? ?????? ?????????????????????????? ??????????";
    bowlPrice = 0;

    $(".selected").removeClass("selected");
            
    updateBowl();
    showBlock(1);

    $("#cartClear").hide();
    $("#btnOrder").hide();
    $("#btnNext").hide();

    removeCustomBowls();

    $("#button-1").removeClass("disabled");
    $("#button-2").removeClass("disabled");
    $("#button-3").removeClass("disabled");
        
    $(".modificator").remove();
    modifCounter = 0; // tempo
    
}


$("#cartClear").on("click", function () {
    refresh();
});
