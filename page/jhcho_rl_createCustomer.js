/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope Public
*/

define(['N/record', 'N/log' ], function( record, log ) {
    
    // 한 객체만 들어오도록
    function post(requestBody) {
        let response = { }

        // 전처리
        // 1. requestBody가 단일 Obj일것 (Arr면 에러발생시키기)
        const customer = JSON.parse(requestBody)
        // 2. 내부에 koreanName이 없으면 throw

        let createRecordPromise = record.create.promise({
            type: record.Type.CUSTOMER,
            isDynamic: true
        });
        createRecordPromise.then((objRecord) => {
            objRecord.setValue({
                fieldId: 'currency',
                value: 1 //'USD'
            })
            objRecord.setValue({
                fieldId: 'customform',
                value: -2
            })
            objRecord.setValue({
                fieldId: 'subsidiary',
                value: 1
            })
            // objRecord.setValue({
            //     fieldId: 'entitystatus',
            //     value: 1
            // })
            objRecord.setValue({
                fieldId: 'altphone',
                value: customer.phone
            })
            objRecord.setValue({
                fieldId: 'email',
                value: customer.email
            })
            objRecord.setValue({
                fieldId: 'companyname',
                value: customer.company
            })
            objRecord.setValue({
                fieldId: 'entityid',
                value: customer.name
            })
            // objRecord.setValue({
            //     fieldId: 'isperson', // type
            //     value: true
            // })

            let recordId = objRecord.save();
            log.debug({
                title: 'New record saved',
                details: 'New record ID: ' + recordId
            })
            // console.log('New record ID: ' + recordId);

            response = {
                result: 'Success',
                id: recordId
            }

        }, function (e) {
            // console.error('Unable to create record', e.name)
            log.error({
                title: 'Unable to create record',
                details: e.name
            })
            throw new Error(e.name)

            response = {
                result: 'Failure',
                error: e.name
            }
        })

        return JSON.stringify(response)
    }

    return { post }
    
});