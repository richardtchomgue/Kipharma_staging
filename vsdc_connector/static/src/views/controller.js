/** @odoo-module */

import { ListController } from '@web/views/list/list_controller';

export class VSDCListController extends ListController {

    /*async actionUpdateTaxes(){
        const response = await this.model.orm.call(this.props.resModel, 'action_update_taxes', [], {});
        location.reload()
    }*/

    async actionFetchPurchases () {
        const response = await this.model.orm.call(this.props.resModel, 'action_fetch_purchases', [], {});
        if (response == false) {
            var action = {
                name: 'VSDC Message',
                type: 'ir.actions.act_window',
                res_model: 'feedback.wizard',
                target: 'new',
                views: [[false, 'form']],
                context: {'default_message': "Purchase Data must be imported from Headquarters! Please check your branch in company settings"},
            }
            await this.actionService.doAction(action);
        }
        else{
            location.reload()
        }
    }

    async actionFetchPurchaseItems () {
        const response = await this.model.orm.call(this.props.resModel, 'action_fetch_items', [], {});
        if (response == false) {
            var action = {
                name: 'VSDC Message',
                type: 'ir.actions.act_window',
                res_model: 'feedback.wizard',
                target: 'new',
                views: [[false, 'form']],
                context: {'default_message': "Purchase Data must be imported from Headquarters! Please check your branch in company settings"},
            }
            await this.actionService.doAction(action);
        }
        else{
            location.reload()
        }
    }

    async actionFetchImportVSDCProducts () {
        var action = {
            name: ('VSDC Items Request'),
            type: 'ir.actions.act_window',
            res_model: 'vsdc.item.wizard',
            target: 'new',
            views: [[false, 'form']],
            context: {},
        }
        await this.actionService.doAction(action);
    }
}
