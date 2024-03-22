/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope Public
*/

define([
    './jhcho_sl_model',
    './jhcho_sl_view'
], function(model, view) {
    
    const onRequest = (context) => {
        const method = context.request.method;
        const params = context.request.parameters;

        if (method === 'GET') { // HTTP Request Method
            const m = model.load(params, method);
            const v = view.load(m);

            context.response.writePage(v.form);
        }
    }

    return {
        onRequest
    }
    
});