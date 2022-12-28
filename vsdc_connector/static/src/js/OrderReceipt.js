odoo.define('vsdc_connector.OrderReceipt', function (require) {
    "use strict";

    const rpc = require('web.rpc')

    var BaseOrderReceipt = require('point_of_sale.OrderReceipt')
    const Registries = require('point_of_sale.Registries');
    const { loadJS } = require('@web/core/assets');
    const { onMounted, onWillStart } = owl;

    const OrderReceipt = (BaseOrderReceipt ) => {
        class OrderReceipt  extends BaseOrderReceipt {
            setup(){
                super.setup();
                onMounted(this.onMounted);
                onWillStart(() => loadJS('https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js'));
            }

            send_print_notification(refund=false){
                let uid = this.props.order.uid
                return rpc.query({
                    model: 'account.move',
                    method: 'mark_printed_from_ui',
                    args: [uid,refund],
                }).then(function (res) {
                });
            }

            generate_receipt_QR_code(){
                let qr;
                let stamp = this.receipt.stamp
                if (stamp && stamp.internalData) {
                    let element = document.getElementById('receipt-qr-container');
                    element.innerHTML = '<canvas id="receipt-qr-code"></canvas>'
                    element = document.getElementById('receipt-qr-code')
                    if (element){
                        qr = new QRious({
                            element: element,
                            size: 70,
                            value: stamp.qr_data
                        });
                    }
                }
            }
            onMounted() {
                let stamp = this.props.order.stamp
                if(stamp) {
                    this.generate_receipt_QR_code()
                    if (!stamp.printed) {
                        this.send_print_notification(stamp.refund)
                    }
                }
            }
        }
        return OrderReceipt;
    };
    Registries.Component.addByExtending(OrderReceipt, BaseOrderReceipt);

    return OrderReceipt;
})