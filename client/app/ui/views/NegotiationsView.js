System.register(['./View.js', '../converters/DateConverter.js'], function (_export, _context) {
    "use strict";

    var View, DateConverter;
    return {
        setters: [function (_ViewJs) {
            View = _ViewJs.View;
        }, function (_convertersDateConverterJs) {
            DateConverter = _convertersDateConverterJs.DateConverter;
        }],
        execute: function () {
            let NegotiationsView = class NegotiationsView extends View {

                template(model) {
                    return `<table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Value</th>
                            <th>Volume</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${model.toArray().map(negotiation => `
                                <tr>
                                    <td>${DateConverter.toText(negotiation.date)}</td>
                                    <td>${negotiation.quantity}</td>
                                    <td>${negotiation.value}</td>
                                    <td>${negotiation.volume}</td>
                                </tr>
                            `).join('')}
                    </tbody>

                    <tfoot>
                            <tr>
                                <td colspan="3"></td>
                                <td>${model.totalVolume}</td>
                            </tr>
                    </tfoot>

                </table>`;
                }
            };

            _export('NegotiationsView', NegotiationsView);
        }
    };
});
//# sourceMappingURL=NegotiationsView.js.map