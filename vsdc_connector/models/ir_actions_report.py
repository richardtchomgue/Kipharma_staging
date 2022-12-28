from odoo import models, _
from odoo.exceptions import UserError


class IrActionsReport(models.Model):
    _inherit = 'ir.actions.report'

    def _render_qweb_pdf(self, report_ref, res_ids=None, data=None):
        # Check for reports only available for invoices.
        invoices = None
        if res_ids and self._get_report(report_ref).report_name in ('account.report_invoice_with_payments', 'account.report_invoice'):
            invoices = self.env['account.move'].browse(res_ids)
            if any(move.state == 'posted' and move.invoice_ok and not move.stamps for move in invoices):
                raise UserError(_("Cannot print an invoice without RRA stamp. Try sending the invoice(s) to VSDC "
                                  "and then try again"))

        res = super()._render_qweb_pdf(report_ref, res_ids=res_ids, data=data)
        if invoices:
            invoices.filtered(lambda move: move.invoice_ok).mark_printed()
        return res
