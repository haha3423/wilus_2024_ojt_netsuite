/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/log'],

    (record, log) => {
        

        function pageInit(scriptContext) {
            
        }
    
        
        function fieldChanged(scriptContext) {
            let currRecord = scriptContext.currentRecord;
            log.debug('currRecord', currRecord) // id가 나온다

            if (currRecord.fieldId === 'entity') {
                log.audit('audit_currRecord', currRecord)
            }

            // let loadedCustomer = record.load.promise({
            //     type: 'Customer',
            //     id: currRecord.
            // }).then(function(response){
            // // DO SOMETHING WITH RESPONSE HERE
            // }, function(error){
            // // DO SOMETHING WITH ERROR HERE
            // });

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
    
        return {
            // pageInit: pageInit,
            fieldChanged: fieldChanged,
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };
        
    });