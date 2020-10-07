let dataController = (function () {

    let Discount = function (id, desc, value) {
        this.ID = id,
            this.desc = desc,
            this.value = value
    }

    let priceSheet = {
        sheet1: 0,
        sheet2: 0,
        sheet3: 0,
        sheet4: 0,
        sheet5: 0,

        update: function (data) {
            this.sheet1 = parseFloat(data[0]);
            this.sheet2 = parseFloat(data[1]);
            this.sheet3 = parseFloat(data[2]);
            this.sheet4 = parseFloat(data[3]);
            this.sheet5 = parseFloat(data[4]);

            return this.toArray();
        },

        toArray: function () {
            let arr = [];
            arr = [this.sheet1, this.sheet2, this.sheet3, this.sheet4, this.sheet5];
            return arr;
        }
    }

    let calcDATA = {
        varU: 0,
        varFi: 0,
        varF: 0,
        service: 0,
        serviceTotal: 0,

        reset: function () {
            this.varU = 0;
            this.varFi = 0;
            this.varF = 0;
            this.service = 0;
            this.serviceTotal = 0;
        }
    };

    let priceDATA = {
        activeSheet: null,
        cartTotal: 0,
        service: 0,
        commision: 0,
        feeTotal: 0,
        cartFeeTotal: 0,
        discounts: [],
        discountTotal: 0,
        VAT: 0,
        total: 0,

        reset: function () {
            this.activeSheet = null;
            this.service = 0;
            this.commision = 0;
            this.feeTotal = 0;
            this.VAT = 0;
            this.total = 0;
        },

        onLoad: function (type, data, value) {
            this[data] = Number(value);
        }
    }

    let customerData = {
        name: null,
        lastName: null,
        phoneNumber: null,
        emailAdress: null,
        sun: null,
        angle: null,
        roof: null
    }

    let calcService = function (data) {
        let varU, varFi, varF, service;
        varU = data.varU;
        varFi = varU * 1.25;
        varF = varFi / 1000;
        service = data.serviceInput;
        calcDATA.varU = varU;
        calcDATA.varFi = Number(varFi.toFixed(2));
        calcDATA.varF = Number(varF.toFixed(2));
        calcDATA.service = Number(service.toFixed(2));
        calcDATA.serviceTotal = Number((varF * service).toFixed(2));
        priceDATA.service = calcDATA.serviceTotal;
        priceDATA.activeSheet = Object.values(priceSheet)[data.sheetNumber];
    }

    let calcDiscounts = function () {
        let total = 0;
        priceDATA.discounts.forEach(ele => {
            total += ele.value;
        })

        priceDATA.discountTotal = total;
    }

    let calcCommision = function () {
        let total = 0;
        if (priceDATA.service > 0) {
            total = (priceDATA.cartTotal + priceDATA.service) * priceDATA.activeSheet;
        }
        priceDATA.commision = total;
    }

    let calcItemsFee = function () {
        let total = 0;
        priceDATA.feeTotal = priceDATA.service + priceDATA.commision;
        total = priceDATA.cartTotal + priceDATA.feeTotal;
        priceDATA.cartFeeTotal = total;
    }

    let calcVAT = function () {
        let total = 0;
        let vat = 0.08;
        let vat23 = 0.23
        if (priceDATA.commision > 0) {
            total = priceDATA.cartFeeTotal * vat;
        } else {
            total = priceDATA.cartFeeTotal * vat23;
        }
        priceDATA.VAT = total;
    };

    let calcTotal = function () {
        let total = 0;
        total = priceDATA.cartFeeTotal + priceDATA.discountTotal + priceDATA.VAT
        priceDATA.total = total;
    }

    let addDiscount = function (data) {
        let ID, name, value;

        if (priceDATA.discounts.length == -1) {
            ID = 0;
        } else {
            ID = priceDATA.discounts.length;
        }


        if (data.discountNameInput !== undefined) {
            name = data.discountNameInput;
            value = '-' + data.discountValueInput;
            value = value.replace(',', '.');
            value = Number(parseFloat(value).toFixed(2));

            newDiscount = new Discount(ID, name, value);

            priceDATA.discounts.push(newDiscount);

            return newDiscount;
        }


    }

    let removeAllDiscounts = function () {
        priceDATA.discounts = [];
        priceDATA.discountTotal = 0;
    }

    return {
        calcAll: function (inputData) {
            calcService(inputData);
            calcDiscounts();
            calcCommision();
            calcItemsFee();
            calcVAT();
            calcTotal();
        },

        updateModal: function (type, data) {
            switch (type) {
                case 'cus':
                    customerData.name = data.customerName;
                    customerData.lastName = data.customerLastName;
                    customerData.phoneNumber = data.customerPhone;
                    customerData.emailAdress = data.customerEmail;
                    customerData.sun = data.sunOrientation;
                    customerData.angle = data.slopeAngle;
                    customerData.roof = data.roofType;
                    return customerData;

                case 'dis':
                    return addDiscount(data);

                case 'rsd':
                    removeDiscountItem(data);
                    break;

                case 'rad':
                    removeAllDiscounts();
                    break;
                case 'var':
                    return priceSheet.update(data);
            }
        },

        removeDiscountItem: function (id) {
            let ids, index;
            ids = priceDATA.discounts.map((current) => {
                return current.ID;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                priceDATA.discounts.splice(index, 1);
            }
        },

        reset: function () {
            calcDATA.reset();
            priceDATA.reset();
        },

        getData: function () {
            return {
                calculations: calcDATA,
                prices: priceDATA,
                sheet: priceSheet,
                customer: customerData
            }
        },

        onLoadData: function (type, data, value) {
            priceDATA.onLoad(type, data, value);
        },

        getSheet: function () {
            return priceSheet.toArray();
        },

    }

})();

let UIcontroller = (function () {
    let DOMstrings = {
        //dane klienta
        customerBtn: 'customerBtn',
        customerCloseBtn: 'customerCloseBtn',
        customerSaveBtn: 'customerSaveBtn',
        customerResetBtn: 'customerResetBtn',
        customerModal: 'customerModal',
        customerModalGrp: [this.customerBtn, this.customerCloseBtn, this.customerSaveBtn],
        customerName: 'customerName',
        customerLastName: 'customerLastName',
        customerPhone: 'customerPhone',
        customerEmail: 'customerEmail',
        fullName: 'fullName',
        phoneNumber: 'phoneNumber',
        emailAdress: 'emailAdress',
        sunOrientation: 'sunOrientation',
        slopeAngle: 'slopeAngle',
        roofType: 'roofType',
        sun: 'sun',
        angle: 'angle',
        roof: 'roof',
        //edycja zmiennych
        variableModal: 'variableModal',
        variableBtn: 'variableBtn',
        variableCloseBtn: 'variableCloseBtn',
        variableSaveBtn: 'variableSaveBtn',
        variableModalGrp: [this.variableBtn, this.variableCloseBtn, this.variableSaveBtn],
        sheet1: 'sheet1',
        sheet2: 'sheet2',
        sheet3: 'sheet3',
        sheet4: 'sheet4',
        sheet5: 'sheet5',
        //zniżki
        discountModalBtn: 'discountModal',
        discountModal: 'discountModal',
        discountCloseBtn: 'discountCloseBtn',
        discountNameInput: 'discountNameInput',
        discountValueInput: 'discountValueInput',
        discountSaveBtn: 'discountSaveBtn',
        discountModalGrp: [this.discountModalBtn, this.discountCloseBtn, this.discountSaveBtn],
        discountContainer: 'discountContainer',
        discountTotalList: 'discountTotalList',
        discountResetBtn: 'radiscountResetBtn',
        //komorka z obliczeniami
        sheetNumber: 'sheetNumber',
        varU: 'varU',
        varFi: 'varFi',
        varF: 'varF',
        serviceInput: 'serviceInput',
        serviceInputTotal: 'serviceInputTotal',
        commision: 'commision',
        calculateBtn: 'calculateBtn',
        resetBtn: 'resetBtn',
        //materiały
        cartTotal: 'cartTotal',
        //opłaty dodatkowe
        serviceUI: 'serviceUI',
        commisionUI: 'commisionUI',
        feeTotal: 'feeTotal',
        //zniżki
        discountTotal: 'discountTotal',
        //podsumowanie
        cartSummary: 'cartSummary',
        feeSummary: 'feeSummary',
        cartFeeSummary: 'cartFeeSummary',
        VAT: 'VAT',
        discountSummary: 'discountSummary',
        total: 'total',
        //dolne menu
        printPdfBtn: 'printPdfBtn',
        saveOrderBtn: 'saveOrderBtn'

    }

    let addDiscountItem = function (data) {
        let html, newHtml, container;

        if (data !== undefined) {
            container = document.getElementById(DOMstrings.discountContainer);
            html = `
            <li class="list-group-item d-flex justify-content-between align-items-center %border%" id="%id%">
                %description%
                <div>
                    <span class="h5">%value%</span>
                    <button type="button" class="close ml-2">
                        <span class="del-discount-item">&times;</span>
                    </button>
                </div>
            </li>
            `;

            newHtml = html.replace('%id%', data.ID);
            newHtml = newHtml.replace('%description%', data.desc);
            newHtml = newHtml.replace('%value%', data.value.toFixed(2));

            if (!container.hasChildNodes()) {
                newHtml.replace('%border%', '');
            }
            container.insertAdjacentHTML('beforeend', newHtml);
        }

    }


    let removeAllDiscounts = function () {
        const parent = document.getElementById(DOMstrings.discountContainer);
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild);
        }
    }

    let clearDiscountInput = function () {
        document.getElementById(DOMstrings.discountNameInput).value = '';
        document.getElementById(DOMstrings.discountValueInput).value = '';
    }

    let customerInput = function () {
        return {
            customerName: document.getElementById(DOMstrings.customerName).value,
            customerLastName: document.getElementById(DOMstrings.customerLastName).value,
            customerPhone: document.getElementById(DOMstrings.customerPhone).value,
            customerEmail: document.getElementById(DOMstrings.customerEmail).value,
            sunOrientation: document.getElementById(DOMstrings.sunOrientation).value,
            slopeAngle: document.getElementById(DOMstrings.slopeAngle).value,
            roofType: document.getElementById(DOMstrings.roofType).value,
        }
    }

    let discountInput = function () {
        let name, value;

        name = document.getElementById(DOMstrings.discountNameInput).value;
        value = document.getElementById(DOMstrings.discountValueInput).value;
        value = value.replace(',', '.');

        if (name !== '' && !isNaN(value)) {
            return {
                discountNameInput: name,
                discountValueInput: value
            }
        } else {
            alert("Wprowadzona wartość zniżki nie jest liczbą.");
            return false;
        }
    }

    let variableInput = function () {
        let sheet1, sheet2, sheet3, sheet4, sheet5, sheetArr, checkNumber, newArr = [];

        sheet1 = document.getElementById(DOMstrings.sheet1).value;
        sheet2 = document.getElementById(DOMstrings.sheet2).value;
        sheet3 = document.getElementById(DOMstrings.sheet3).value;
        sheet4 = document.getElementById(DOMstrings.sheet4).value;
        sheet5 = document.getElementById(DOMstrings.sheet5).value;

        sheetArr = [sheet1, sheet2, sheet3, sheet4, sheet5];

        sheetArr.forEach(function (ele) {
            newArr.push(parseFloat(ele.replace(',', '.')));
        })

        checkNumber = newArr.some(function (ele) {
            return !isNaN(ele) && ele !== '';
        })


        if (checkNumber) {
            return newArr;
        } else {
            alert("Wprowadzona wartość zniżki nie jest liczbą.");
            return false;
        }
    }



    return {
        getInput: function () {
            let varU, tempServiceInput, inputs;

            varU = document.getElementById(DOMstrings.varU).value;
            varU = varU.replace(',', '.');
            varU = parseFloat(varU);
            tempServiceInput = parseFloat(document.getElementById(DOMstrings.serviceInput).value);

            sheetNumber = document.getElementById(DOMstrings.sheetNumber).selectedIndex;

            if (!isNaN(varU) && !isNaN(tempServiceInput)) {
                inputs = {
                    varU: varU,
                    serviceInput: tempServiceInput,
                    sheetNumber: sheetNumber,
                }
            } else {
                inputs = {
                    varU: 0,
                    serviceInput: 0,
                    sheetNumber: sheetNumber,
                }
            }

            return inputs;
        },


        //get input from modals depending on type
        getModalInput: function (type) {

            switch (type) {
                case 'cus':
                    return customerInput()
                case 'dis':
                    return discountInput();
                case 'var':
                    return variableInput();
            }
        },

        //reset modal input 

        updateUI: function (calcData, priceData) {
            //varFi
            document.getElementById(DOMstrings.varFi).innerHTML = calcData.varFi.toFixed(2);
            //varF
            document.getElementById(DOMstrings.varF).innerHTML = calcData.varF.toFixed(2);
            //serviceInputTotal
            document.getElementById(DOMstrings.serviceInputTotal).innerHTML = calcData.serviceTotal.toFixed(2);
            //service UI
            document.getElementById(DOMstrings.serviceUI).innerHTML = priceData.feeTotal.toFixed(2);
            //commission
            document.getElementById(DOMstrings.commision).innerHTML = priceData.commision.toFixed(2);
            //fee total
            document.getElementById(DOMstrings.feeTotal).innerHTML = priceData.feeTotal.toFixed(2);
            document.getElementById(DOMstrings.feeSummary).innerHTML = priceData.feeTotal.toFixed(2);
            //discounts
            document.getElementById(DOMstrings.discountTotal).innerHTML = priceData.discountTotal.toFixed(2);
            //cart total
            document.getElementById(DOMstrings.cartSummary).innerHTML = priceData.cartTotal.toFixed(2);
            //items + fee total
            document.getElementById(DOMstrings.cartFeeSummary).innerHTML = priceData.cartFeeTotal.toFixed(2);
            //VAT
            document.getElementById(DOMstrings.VAT).innerHTML = priceData.VAT.toFixed(2);
            //discounts
            document.getElementById(DOMstrings.discountSummary).innerHTML = priceData.discountTotal.toFixed(2);
            //TOTAL
            document.getElementById(DOMstrings.total).innerHTML = priceData.total.toFixed(2);
        },

        updateUIModal: function (type, data) {
            switch (type) {
                case 'cus':
                    //customer name
                    let name = data.name + ' ' + data.lastName;
                    document.getElementById(DOMstrings.fullName).innerHTML = name;
                    //customer phone
                    document.getElementById(DOMstrings.phoneNumber).innerHTML = data.phoneNumber;
                    //customer email
                    document.getElementById(DOMstrings.emailAdress).innerHTML = data.emailAdress;
                    //sun orientation
                    document.getElementById(DOMstrings.sun).innerHTML = data.sun;
                    //slope  angle
                    document.getElementById(DOMstrings.angle).innerHTML = data.angle;
                    //roof type
                    document.getElementById(DOMstrings.roof).innerHTML = data.roof;

                    break;
                case 'dis':
                    addDiscountItem(data);
                    clearDiscountInput();
                    break;

                case 'rdi':
                    removeDiscountItem(ID);
                    break;
                case 'rad':
                    removeAllDiscounts();
                    break;
                case 'var':
                    document.getElementById(DOMstrings.sheet1).value = data[0];
                    document.getElementById(DOMstrings.sheet2).value = data[1];
                    document.getElementById(DOMstrings.sheet3).value = data[2];
                    document.getElementById(DOMstrings.sheet4).value = data[3];
                    document.getElementById(DOMstrings.sheet5).value = data[4];

            }

        },

        removeDiscountItem: function (selectorID) {
            let ele = document.getElementById(selectorID);
            ele.parentNode.removeChild(ele);
        },

        clearInput: function () {
            let inputsArr = [],
                varU, serviceInput;

            varU = document.getElementById(DOMstrings.varU);
            serviceInput = document.getElementById(DOMstrings.serviceInput);
            inputsArr.push(varU);
            inputsArr.push(serviceInput);

            inputsArr.forEach(function (ele) {
                ele.value = '';
            })
        },

        resetCustomerInput: function () {
            document.getElementById(DOMstrings.customerName).value = '',
                document.getElementById(DOMstrings.customerLastName).value = '',
                document.getElementById(DOMstrings.customerPhone).value = '',
                document.getElementById(DOMstrings.customerEmail).value = '',
                document.getElementById(DOMstrings.sunOrientation).value = 'wybierz...',
                document.getElementById(DOMstrings.slopeAngle).value = 'wybierz...',
                document.getElementById(DOMstrings.roofType).value = 'wybierz...'
        },

        getDOMstrings: function () {
            return DOMstrings;
        },



        getCartTotal: function () {
            return {
                cartTotal: document.getElementById(DOMstrings.cartTotal).innerHTML,
            }
        },

        toggleModal: function (e) {
            let string = e.target.id.substring(0, 3);
            const customer = document.getElementById(DOMstrings.customerModal);
            const discount = document.getElementById(DOMstrings.discountModal);
            const variable = document.getElementById(DOMstrings.variableModal);

            switch (string) {
                case 'cus':
                    customer.classList.toggle('toggle-modal');
                    break;
                case 'dis':
                    discount.classList.toggle('toggle-modal');
                    break;
                case 'var':
                    variable.classList.toggle('toggle-modal');
                    break;
                default:
                    break;
            }
        }

    }

})();

let wpController = (function () {
    return {

        serializeObject : function (obj) {
            let serialized = [];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    serialized.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
                }
            }
            return serialized.join('&');
        },

        postData: function (string) {
            let xmlhttp = new XMLHttpRequest();
            let data = {
                'action': 'update_post_ajax',
                'sheet_data': string,
            };

            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {

                }
            };

            xmlhttp.open('POST', ajaxurl);
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
            xmlhttp.send('action=update_post_ajax&sheet_data=' + string);
        },

        getData: function () {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let data = this.responseText;
                    data = data.split(',');
                    dataController.updateModal('var', data);
                    UIcontroller.updateUIModal('var', data);
                }

            };
            xmlhttp.open('POST', ajaxurl, true);
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
            xmlhttp.send('action=get_post_data');
        },

        createOrder: function (data) {
            let xmlhttp = new XMLHttpRequest();
            let postData = {
                'action': 'create_new_order_ajax',
                'first_name': data.customer.name,
                'last_name': data.customer.lastName,     
                'email': data.customer.emailAdress,     
                'phone': data.customer.phoneNumber,     
                'address_1': ' - ', 
                'city': ' - ',      
                'postcode': ' - ',  
                'country': 'Polska',
                'service': data.prices.feeTotal,
                'discount': data.prices.discountTotal  
            };

            let serialized = this.serializeObject(postData);
            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(this.response);
                }
            };

            xmlhttp.open('POST', ajaxurl);
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
            xmlhttp.send(serialized);
        }
    }

})();

let appController = (function (dataCtrl, UICtrl, WPCtrl) {

    const setupListeners = function () {
        const DOM = UICtrl.getDOMstrings();
        window.onload = function () {
            let data = UICtrl.getCartTotal();
            dataCtrl.onLoadData('priceData', 'cartTotal', data.cartTotal);
            updateApp();
        }
        document.getElementById(DOM.calculateBtn).addEventListener('click', updateApp);
        document.getElementById(DOM.resetBtn).addEventListener('click', reset);
        //customer modal
        DOM.customerModalGrp.forEach(function (ele) {
            ele.addEventListener('click', UICtrl.toggleModal);
        })

        DOM.discountModalGrp.forEach(function (ele) {
            ele.addEventListener('click', UICtrl.toggleModal);
        })

        DOM.variableModalGrp.forEach(function (ele) {
            ele.addEventListener('click', UICtrl.toggleModal);
        })

        document.getElementById(DOM.customerSaveBtn).addEventListener('click', updateModal);
        document.getElementById(DOM.discountSaveBtn).addEventListener('click', updateModal);
        document.getElementById(DOM.discountResetBtn).addEventListener('click', updateModal);
        document.getElementById(DOM.discountContainer).addEventListener('click', removeDiscountItem);
        document.getElementById(DOM.customerResetBtn).addEventListener('click', resetCustomerInput);
        document.getElementById(DOM.variableSaveBtn).addEventListener('click', updateModal);
        document.getElementById(DOM.variableSaveBtn).addEventListener('click', savePriceSheets);
        document.getElementById(DOM.printPdfBtn).addEventListener('click', saveToPdf);
        document.getElementById(DOM.saveOrderBtn).addEventListener('click', saveOrder);
        
    }

    const updateApp = function () {
        let input = UICtrl.getInput();
        dataCtrl.calcAll(input);
        let data = dataCtrl.getData();
        UICtrl.updateUI(data.calculations, data.prices);
    }

    const updateModal = function (e, ID = null) {
        let string = e.target.id.substring(0, 3);
        let input = UICtrl.getModalInput(string);
        let data = dataCtrl.updateModal(string, input);
        UICtrl.updateUIModal(string, data);
        updateApp();

    }

    const removeDiscountItem = function (e) {
        let itemID;

        if (e.target.className === 'del-discount-item') {
            itemID = e.target.parentElement.parentElement.parentElement.id;
            itemID = Number(itemID);
            dataCtrl.removeDiscountItem(itemID);
            UICtrl.removeDiscountItem(itemID);
            updateApp();
        }
    }

    const resetCustomerInput = function () {
        UICtrl.resetCustomerInput();
    }

    const reset = function () {
        dataCtrl.reset();
        UICtrl.clearInput();
        updateApp();
    }

    const saveToPdf = function () {
        let element = document.getElementById('printPdf');
        let discountDivs = document.getElementById('discountDiv');
        discountDivs.style.display = "none";
        let opt = {
            margin: 4,
            html2canvas: {
                scale: 2
            },
            jsPDF: {
                format: 'a4',
                setFontSize: 9
            }
        }
        html2pdf(element, opt);
        setTimeout(() => {
            discountDivs.style.display = "block";
        }, 10000)

    }

    const saveOrder = function () {
        let data = dataCtrl.getData();
        WPCtrl.createOrder(data);
    }

    const loadPriceSheets = function () {
        WPCtrl.getData();
    }

    const savePriceSheets = function () {
        let data = dataCtrl.getSheet()
        WPCtrl.postData(data);
    }

    return {
        init: function () {
            setupListeners();
            updateApp();
            loadPriceSheets();
        }
    }

})(dataController, UIcontroller, wpController);

appController.init();