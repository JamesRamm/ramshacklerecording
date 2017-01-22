from wagtail.contrib.modeladmin.options import (
    ModelAdmin, modeladmin_register
)

from orders.models import Order

class OrderModelAdmin(ModelAdmin):
    model = Order
    menu_order = 100
    menu_icon = 'list-ul'
    add_to_settings_menu = False
    exclude_from_explorer = False
    list_display = ('status', 'status_note', 'email', 'payment_date')
    list_filter = ('status', 'payment_date', 'email')
    inspect_view_enabled = True

modeladmin_register(OrderModelAdmin)
