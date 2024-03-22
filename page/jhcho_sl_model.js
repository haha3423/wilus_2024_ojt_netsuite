/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */

define([
    'N/search',
    'N/format',
], function(
    search,
    format
) {

    class GetModel {
        constructor(params) {
            const PAGE_SIZE = 1000;
            //this.resultArray = getResultSet(params, PAGE_SIZE);
            this.resultArray = []
            this.params = params
        }
    }

    function entry(params, method) {

        // 검색조건 기본값
        const today = new Date();
        const dateFirst = new Date(today.getFullYear(), today.getMonth(), 1);
        const dateLast = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        params.invType = '매입';
        if (!params.dateOption) params.dateOption = 'write_date';
        if (!params.dateFrom) params.dateFrom = formatDateToString(dateFirst);
        if (!params.dateTo) params.dateTo = formatDateToString(dateLast);
        if (!params.procSts) params.procSts = 'N';

        if (method === 'GET') {
            return new GetModel(params);
        }
    }

    function formatDateToString(dateObj) {
        // ex) dateObj -> 04/30/2022
        if (dateObj) {
            const datetime = format.format({
                value: dateObj,
                type: format.Type.DATETIME,
                timezone: format.Timezone.ASIA_SEOUL
            });
            return datetime.split(' ')[0];
        } else {
            return null;
        }
    }

    return {
        load : entry
    }


});