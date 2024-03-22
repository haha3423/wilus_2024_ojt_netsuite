/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([
    'N/record'
    , 'N/search'
    , 'N/log'
],

    (
        record,
        search,
        log
    ) => {


        function getTaxItems() {
            let resultSet = [];
            let taxItemSearch = search.create({
                type: 'salestaxitem',
                columns: [
                    'internalid'
                    , 'name'
                    , 'itemid'
                    , 'rate'
                ],
                filter: []
            }).runPaged({ pageSize: 1000 }); // paged Search ( Arr[index] )

            let taxitemCnt = Math.ceil(taxItemSearch.count / 1000); // counting index
            if (taxitemCnt > 0) {

                for (let index = 0; index < taxitemCnt; index++) {
                    taxItemSearch.fetch({ index: index }) // {id, data, ...}
                        .data.forEach(row => { // row == { salestaxitem } : object
                            resultSet.push({
                                internalid: row.getValue('internalid'),
                                name: row.getValue('name'),
                                itemid: row.getValue('itemid'),
                                rate: row.getValue('rate')
                            });
                        });
                }
            }
            return resultSet;
        }


        const beforeLoad = (scriptContext) => {

        }

        const beforeSubmit = (scriptContext) => {

        }

        const afterSubmit = (scriptContext) => {

            const governance = 1000
            // --------------------------------

            /**
             * Record Load
             */
            const newRecord = scriptContext.newRecord
            const id = newRecord.id
            // 위 아이디로 인보이스를 조회하면
            // Invoice Record가 출력됨

            const invoice = record.load({
                type: record.Type.INVOICE, // Transaction.type == invoice, salesorder, vendorbill ....
                id: id,
            })

            const entityId = invoice.getValue('entity')
            log.debug('entityId', entityId)

            const customer = record.load({
                type: record.Type.CUSTOMER,
                id: entityId, // InternalId(system), ExternalId
            })


            const taxItems = getTaxItems()
            log.debug('taxItems', JSON.stringify(taxItems))

            let 내가원하는택스아이템 = taxItems.filter((ti) => { ti.internalid == invoice.getValue('taxitem') })
            log.debug('내가원하는택스아이템', 내가원하는택스아이템)

        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });