
$.get("/api/basket_total_items/", (response) => {
    $("#basket-item-count").text(response.quantity)
})

