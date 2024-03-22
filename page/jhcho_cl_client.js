/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/log', 'N/currentRecord', 'N/record'],

    (https, log, currentRecord) => {


        function pageInit(scriptContext) {

        }


        function fieldChanged(scriptContext) {

        }


        function postSourcing(scriptContext) {

        }


        function sublistChanged(scriptContext) {

        }


        function lineInit(scriptContext) {

        }


        function validateField(scriptContext) {

        }


        function validateLine(scriptContext) {

        }


        function validateInsert(scriptContext) {

        }


        function validateDelete(scriptContext) {

        }


        function saveRecord(scriptContext) {

        }


        const doFind = (context) => {
            https.get.promise({
                url: 'https://jsonplaceholder.typicode.com/users'
            })
            .then(function (response) {
                log.debug({
                    title: 'Response',
                    details: response
                });
                console.log('Response', response)

                const data = JSON.parse(response.body)
                console.log('data', data)   

                // list에 데이터 넣어주기
                const currPage = currentRecord.get()
                const sublistId = 'custpage_customer_list'

                for (let index = 0; index < data.length; index++) {
                    const el = data[index];
                    
                    currPage.selectNewLine({
                        sublistId: sublistId
                    });
                    currPage.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'id',
                        value: el.id,
                        ignoreFieldChange: true
                    });
                    currPage.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'name',
                        value: el.name,
                        ignoreFieldChange: true
                    });
                    currPage.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'username',
                        value: el.username,
                        ignoreFieldChange: true
                    });
                    currPage.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'email',
                        value: el.email,
                        ignoreFieldChange: true
                    });
                    currPage.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'zipcode',
                        value: el.address.zipcode,
                        ignoreFieldChange: true
                    });
                    currPage.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'phone',
                        value: el.phone,
                        ignoreFieldChange: true
                    });
                    currPage.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'company',
                        value: el.company.name,
                        ignoreFieldChange: true
                    });
                    currPage.commitLine({sublistId});
            }             
                
        })
        .catch(function onRejected(reason) {
                log.debug({
                    title: 'Invalid Get Request: ',
                    details: reason
                });
                console.error('Invalid Get Request: ' + reason);
            })
        }

        const createCustomer = () => {
            // record.save({})
        }


        function getCheckedRows() {
            const sublistId = 'custpage_hometax_sublist';
            const resultFieldIds = ['internal_id', 'vendor', 'account', 'item', 'posting_date', 'journal_number', 'total_amt'];
            // 2023.12.04 journal_number 신규추가
    
            let checkedRows = [];
            const curRecord = currentRecord.get();
            const lineCount = curRecord.getLineCount({ sublistId: sublistId });
    
            for (let i = 0; i < lineCount; i++) {
                let check = curRecord.getSublistValue({
                    sublistId: sublistId,
                    fieldId: 'check',
                    line: i
                });
    
                if (check) {
                    let resultRow = {};
    
                    resultFieldIds.forEach(fieldId => {
                        resultRow[fieldId] = curRecord.getSublistValue({
                            sublistId: sublistId,
                            fieldId: fieldId,
                            line: i
                        });
                    });
    
                    checkedRows.push({
                        rowIndx: i,
                        ...resultRow
                    });
                }
    
            }
            console.log('checkedRows', checkedRows)
            return checkedRows;
        }

        return {
            pageInit,
            // fieldChanged: fieldChanged,
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
            doFind,
            createCustomer
        };

    });