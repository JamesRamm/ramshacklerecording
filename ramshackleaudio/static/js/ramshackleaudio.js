
updateBasketCount();

function updateBasketCount() {
    longclawclient.basketListCount.get({ prefix: '/api/'})
        .then(function (response){
            $("#basket-item-count").text(response.quantity)
    });
}

function postItem(variantId) {
    longclawclient.basketList.post({
        prefix: '/api/',
        data: {
            variant_id: variantId
        }
    })
      .then(function (response){
            updateBasketCount();
    });
}
