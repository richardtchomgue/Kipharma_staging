from odoo import fields, models, _


class VSDCItemWizard(models.TransientModel):
    _name = 'vsdc.item.wizard'
    _description = 'VSDC Item Wizard'

    last_date = fields.Datetime('Last Date')
    message = fields.Text('Response')

    def action_import(self):
        """ close wizard"""
        vsdc_items = self.env['vsdc.product.import']
        item_ids = vsdc_items.action_fetch_vsdc_products(self.last_date)
        if len(item_ids) > 1:
            self.message = f"Items Imported Successfully, reloading the screen."
        else:
            self.message = "No data found on the requested date"

        return {
            'type': 'ir.actions.act_window',
            'name': _("Import Response"),
            'res_model': 'feedback.wizard',
            'view_mode': 'form',
            'context': {'default_message': self.message, 'called_item_import': True},
            "target": "new",
        }

