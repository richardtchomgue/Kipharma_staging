odoo.define('vsdc_connector.StockPopup', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');
    const { useAutoFocusToLast } = require('point_of_sale.custom_hooks');
    const { useState } = owl;

    class StockPopup extends AbstractAwaitablePopup {
        setup() {
            super.setup();
            debugger
            this.state = useState({
                lines: this.props.lines,
                location: this.props.location
            });
            useAutoFocusToLast();

        }

    }

    StockPopup.template = 'StockPopup';
    Registries.Component.add(StockPopup);
    StockPopup.defaultProps = {
        confirmText: 'Ok',
        lines: [],
        location: '',
    };

    return StockPopup;
});
