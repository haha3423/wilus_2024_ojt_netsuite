/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/log', 'N/currentRecord', 'N/url'],

    (https, log, currentRecord, url) => {


        function pageInit(scriptContext) { }

        function fieldChanged(scriptContext) { }

        function postSourcing(scriptContext) { }

        function sublistChanged(scriptContext) { }

        function lineInit(scriptContext) { }

        function validateField(scriptContext) { }

        function validateLine(scriptContext) { }

        function validateInsert(scriptContext) { }

        function validateDelete(scriptContext) { }

        function saveRecord(scriptContext) { }


        function lineInsert (currPage, sublistId, data) {
            // list에 데이터 넣어주기
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
                currPage.commitLine({ sublistId });
            }
        }

        // Custom Functions
        const doFind = (context) => {
            const currPage = currentRecord.get();
            const sublistId = 'custpage_customer_list'

            // field
            let nameVal = currPage.getValue({ fieldId: 'form_name' });
            
            // grid
            https.get.promise({
                url: 'https://jsonplaceholder.typicode.com/users'
            }).then(function (response) {
                log.debug({
                    title: 'Response',
                    details: response
                });
                // console.log('Response', response)

                const data = JSON.parse(response.body)
                // console.log('data', data)

                // if (nameVal) {
                //     if (data.name === nameVal) {
                //         lineInsert(currPage, sublistId, data)
                //     }
                // } else {
                //     lineInsert(currPage, sublistId, data)
                // }
                lineInsert(currPage, sublistId, data)
  
            }).catch(function onRejected(reason) {
                    log.debug({
                        title: 'Invalid Get Request: ',
                        details: reason
                    });
                    console.error('Invalid Get Request: ' + reason);
                })
        }

        function createCustomer() {
            // record.save({})
            const selectedUser = getCheckedRows() // []

            selectedUser.forEach(async (customer) => {
                // restlet 호출

                // 1. N/https 모듈 사용 (SuiteScript)       << NS
                const restletUrl = url.resolveScript({
                    scriptId: 'customscript_jhcho_rl_create_customer',
                    deploymentId: 'customdeploy_jhcho_rl_create_customer'
                })

                // const body = checkedRows;
                const body = {...customer}
                let headerObj = []
                headerObj['Content-Type'] = 'application/json'

                await https.post.promise({
                    url: restletUrl,
                    body: JSON.stringify(body),
                    headers: headerObj
                }).then((result) => {
                    console.log('result', result.body);
                });

                // 2. fetch, axios JS5, 6 기능을 이용한 방법  << JS
                
            })
        }


        function getCheckedRows() {
            const sublistId = 'custpage_customer_list';
            const resultFieldIds = [
                'id',
                'name',
                'username',
                'email',
                'zipcode',
                'phone',
                'company'
            ];

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