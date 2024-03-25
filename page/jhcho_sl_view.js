/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([
    'N/ui/serverWidget'
], function(ui) {

    const entry = (model) => {
        return new View(model);
    }

    class View {
        constructor(model) {
            this.form = createForm(model);
        }
     }

    function createForm(model) {

        const form = ui.createForm({
            title: '[TEST] 고객 등록'
        });

        createField(form, model);

        const sublist = createSublist(form, model);

        // setSublistValue(sublist, model);

        addButton(form, model);

        form.clientScriptModulePath = './jhcho_cl_client.js';

        return form;

    }


    function createField(form, model) {

        form.addFieldGroup({
            id: 'fldgrp1_id',
            label: '검색조건'
        });

        let processStatusFld = form.addField({
            id: 'custpage_ko_hometax_field_proc_sts',
            type: ui.FieldType.SELECT,
            container: 'fldgrp1_id',
            label: '고객',
            source: 'customer'
        })

        let nameFld = form.addField({
            id: 'form_name',
            type: ui.FieldType.TEXT,
            container: 'fldgrp1_id',
            label: '이름'
        });
        
        // set field value
        // const params = model.params;
        // if (params.dateOption) {
        //     dateOptionFld.defaultValue = params.dateOption
        // }

    }

    function createSublist(form, model) {
        const params = model.params;
        let acctList = model.acctList;
        // let itemList = model.itemList;

        const mainTab = form.addSubtab({
            id: 'custpage_main_tab',
            label: "검색결과"
        });
        // --------
        const sublist = form.addSublist({
            id: 'custpage_customer_list',
            type: ui.SublistType.INLINEEDITOR, // EDITOR (writable)
            // type: ui.SublistType.LIST,
            label: 'External Customer List',
            tab: 'custpage_main_tab'
        });
        // sublist.addButton({
        //     id: 'custSelectAll',
        //     label: 'Mark All',
        //     functionName: 'doMarkAll(true)'
        // });
        // sublist.addButton({
        //     id: 'custDeselectAll',
        //     label: 'Unmark All',
        //     functionName: 'doMarkAll(false)'
        // });
        sublist.addField({
            id: 'check',
            type: ui.FieldType.CHECKBOX,
            label: 'Check'
        });
        // --------
        sublist.addField({
            id: 'id',
            type: ui.FieldType.INTEGER,
            label: 'ID'
        });
        sublist.addField({
            id: 'name',
            type: ui.FieldType.TEXT,
            label: 'Name'
        });
        sublist.addField({
            id: 'username',
            type: ui.FieldType.TEXT,
            label: 'Username'
        });
        sublist.addField({
            id: 'email',
            type: ui.FieldType.EMAIL,
            label: 'Email'
        });
        sublist.addField({
            id: 'zipcode',
            type: ui.FieldType.TEXT,
            label: 'zipcode'
        });
        sublist.addField({
            id: 'phone',
            type: ui.FieldType.PHONE,
            label: 'phone'
        });
        sublist.addField({
            id: 'company',
            type: ui.FieldType.TEXT,
            label: 'compnay'
        });

        /*
        {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
            }
        },
        */
        return sublist;
    }

    // function setSublistValue(sublist, model) {
    //     const resultSet = model.resultArray;
    //     if (resultSet) {
    //         resultSet.forEach((row, index) => {

    //             sublist.setSublistValue({
    //                 id: 'internal_id',
    //                 line: index,
    //                 value: emptyToNull(row.internalId)
    //             });

    //             // ============입력필드
    //             sublist.setSublistValue({
    //                 id: 'vendor',
    //                 line: index,
    //                 value: emptyToNull(row.vendor)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'vendor_cur',
    //                 line: index,
    //                 value: emptyToNull(row.vendor_cur)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'account',
    //                 line: index,
    //                 value: emptyToNull(row.account)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'item',
    //                 line: index,
    //                 value: emptyToNull(row.item)
    //             });
    //             // ============입력필드

    //             sublist.setSublistValue({
    //                 id: 'nts_conf_no',
    //                 line: index,
    //                 value: emptyToNull(row.nts_conf_no)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'item_nm',
    //                 line: index,
    //                 value: emptyToNull(row.item_nm)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'write_date',
    //                 line: index,
    //                 value: emptyToNull(row.write_date)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'issue_date',
    //                 line: index,
    //                 value: emptyToNull(row.issue_date)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'send_date',
    //                 line: index,
    //                 value: emptyToNull(row.send_date)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'tax_type',
    //                 line: index,
    //                 value: emptyToNull(row.tax_type)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'invr_co_no',
    //                 line: index,
    //                 value: emptyToNull(row.invr_co_no)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'invr_co_nm',
    //                 line: index,
    //                 value: emptyToNull(row.invr_co_nm)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'supply_cost',
    //                 line: index,
    //                 value: emptyToNull(row.supply_cost)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'tax',
    //                 line: index,
    //                 value: emptyToNull(row.tax)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'total_amt',
    //                 line: index,
    //                 value: emptyToNull(row.total_amt)
    //             });

    //             // 2023.12.06 신규 프로세스 - rec_id가 있으면 Bill로 연결을, jn_id가 있으면 JournaL로 연결처리
    //             let relatedRecordVal = null
    //             if (row.rec_id != '') {
    //                 relatedRecordVal = `<a href="/app/accounting/transactions/vendbill.nl?id=${row.rec_id}" target="_blank">Bill-${row.rec_id}</a>`
    //             }
    //             if (row.jn_id != '') {
    //                 relatedRecordVal = `<a href="/app/accounting/transactions/journal.nl?id=${row.jn_id}" target="_blank">Journal-${row.jn_no}</a>`
    //             }

    //             // 2023.12.04 신규추가
    //             sublist.setSublistValue({
    //                 id: 'related_record_id',
    //                 line: index,
    //                 value: emptyToNull(relatedRecordVal)
    //             });
    //             sublist.setSublistValue({
    //                 id: 'journal_number',
    //                 line: index,
    //                 value: emptyToNull(row.jn_no)
    //             });

    //         });
    //     }
    // }

    function addButton(form, model) {
        const params = model.params;

        form.addButton({
            id: 'custpage_test_dofind',
            label: 'Find',
            functionName: 'doFind()'
        });
        if (params.procSts === 'N') {
            form.addButton({
                id: 'custpage_test_create_customer',
                label: 'Create Customer',
                functionName: 'createCustomer()'
            });
        }
    }

    return {
        load : entry
    }


});