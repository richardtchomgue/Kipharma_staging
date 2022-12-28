# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import models


class PosSession(models.Model):
    _inherit = 'pos.session'

    def _loader_params_res_partner(self):
        result = super()._loader_params_res_partner()
        if result:
            result['search_params']['fields'].append('street2')
            result['search_params']['fields'].append('tax_payer_status')
        return result

    def _loader_params_res_company(self):
        result = super()._loader_params_res_company()
        if result:
            result['search_params']['fields'].append('street')
            result['search_params']['fields'].append('street2')
            result['search_params']['fields'].append('city')
            result['search_params']['fields'].append('mobile')
            result['search_params']['fields'].append('default_customer')
            result['search_params']['fields'].append('account_sale_tax_id')
        return result

    def _loader_params_res_users(self):
        result = super()._loader_params_res_users()
        if result:
            result['search_params']['fields'].append('street')
        return result

    def _loader_params_account_tax(self):
        result = super()._loader_params_account_tax()
        if result:
            result['search_params']['fields'].append('amount')
            result['search_params']['fields'].append('rra_code')
            result['search_params']['fields'].append('label')
        return result

    def _loader_params_product_product(self):
        result = super()._loader_params_product_product()
        if result:
            result['search_params']['fields'].append('item_code')
            result['search_params']['fields'].append('type')
        return result
