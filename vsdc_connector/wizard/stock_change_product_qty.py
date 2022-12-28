# -*- coding: utf-8 -*-

from odoo import _, api, fields, models


class ProductChangeQuantity(models.TransientModel):
    _inherit = "stock.change.product.qty"

    def change_product_qty(self):
        """ Changes the Product Quantity by creating/editing corresponding quant.
        """
        warehouse = self.env['stock.warehouse'].search(
            [('company_id', '=', self.env.company.id)], limit=1
        )
        # Before creating a new quant, the quand `create` method will check if
        # it exists already. If it does, it'll edit its `inventory_quantity`
        # instead of create a new one.
        self.env['stock.quant'].with_context(inventory_mode=True).create({
            'product_id': self.product_id.id,
            'location_id': warehouse.lot_stock_id.id,
            'inventory_quantity': self.new_quantity,
        }).action_apply_inventory()
        return {'type': 'ir.actions.act_window_close'}
