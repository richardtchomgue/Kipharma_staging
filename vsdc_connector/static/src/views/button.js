/** @odoo-module */

import { listView } from '@web/views/list/list_view';
import { registry } from "@web/core/registry";
import { VSDCListController as Controller } from './controller';

export const VSDCPurchaseListView = {
    ...listView,
    Controller,
    buttonTemplate: 'vsdc_connector.PurchaseButtons.Buttons',
};

registry.category("views").add("vsdc_buttons", VSDCPurchaseListView);
