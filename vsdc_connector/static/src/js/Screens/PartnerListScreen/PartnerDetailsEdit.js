odoo.define('vsdc_connector.PartnerDetailsEdit', function(require) {

    const PartnerDetailsEdit = require('point_of_sale.PartnerDetailsEdit');
    const Registries = require('point_of_sale.Registries');
    const session = require('web.session');
    const rpc = require('web.rpc')

    const VatSearchPartnerDetailsEdit = PartnerDetailsEdit => class extends PartnerDetailsEdit {
        async searchPartnerDetailsByVat(event) {
            var parent = $(event.target).parents('.partner-detail')
            var vat = parent.find("[name='vat']").val()
            const { successful, payload } = await rpc.query({
                model: 'res.partner',
                method: 'pos_get_customer_details',
                args: [vat, true],
            });
            if (successful) {
                $("[name='name']").val(payload['name']);
                this.changes['name'] = payload['name']

                $("[name='street']").val(payload['street']);
                this.changes['street'] = payload['street']

                $("[name='street2']").val(payload['street2']);
                this.changes['street2'] = payload['street2']

                $("[name='tax_payer_status']").val(payload['tax_payer_status']);
                this.changes['tax_payer_status'] = payload['tax_payer_status']

                $("[name='city']").val(payload['city']);
                this.changes['city'] = payload['city']

                $("[name='phone']").val(payload['phone']);
                this.changes['phone'] = payload['phone']

            } else {
                this.showPopup('ErrorPopup', {
                    title: this.env._t('Loading Partner Details Error'),
                    body: this.env._t(
                        `[${payload}] Encountered error when getting Partner details, please try again. `
                    ),
                });
            }
        }
    };

    Registries.Component.extend(PartnerDetailsEdit, VatSearchPartnerDetailsEdit);

    return PartnerDetailsEdit;
});
