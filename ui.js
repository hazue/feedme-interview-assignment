//Contains function that controls DOM


function toggleView(){
    const elemCustomerView = document.getElementById("customer_view");
    const elemManagerView = document.getElementById("manager_view");

    if( elemCustomerView.checkVisibility() ){
        elemCustomerView.style.display = "none";
        elemManagerView.style.display = "block";
    }else{
        elemCustomerView.style.display = "block";
        elemManagerView.style.display = "none";
    }
}

function createEmptyDiv(){
    const tmpElemDiv = document.createElement('div');
    tmpElemDiv.className = 'col s12';
    return tmpElemDiv;
}

function createDivColS6(strText, strAdditionalClass){
    const tmpElemDiv = document.createElement('div');
    tmpElemDiv.className = "col s6";
    if( typeof(strAdditionalClass) == 'string' & strAdditionalClass.length > 0  ){
        tmpElemDiv.className += " " + strAdditionalClass;
    }
    tmpElemDiv.innerText = strText
    
    return tmpElemDiv;
}




function refreshOrderList(listOfOrders, elemId){
    const elemOrderList = document.getElementById(elemId);
    elemOrderList.innerHTML = '';

    if( listOfOrders.length <= 0 ){
        const elemEmptyDiv = createEmptyDiv();
        elemEmptyDiv.innerText = 'N/A';
        elemOrderList.appendChild(elemEmptyDiv);
        return;
    }

    let tmpOrderId, tmpElemEmptyDiv;
    for(let i=0; i<listOfOrders.length; i++){
        tmpOrderId = 'Order #' + listOfOrders[i].id;
        if( listOfOrders[i].priorityType == ORDER_TYPE_VIP ){
            tmpOrderId += ' (VIP)';
        }
        tmpElemEmptyDiv = createEmptyDiv();
        tmpElemEmptyDiv.innerText = tmpOrderId;
        elemOrderList.appendChild(tmpElemEmptyDiv);
    }
}

function refreshBotList(){
    const elemBotList = document.getElementById('bot_list');
    elemBotList.innerHTML = '';

    if( cooking_bots.length <= 0 ){
        const elemEmptyDiv = createEmptyDiv();
        elemEmptyDiv.innerText = 'N/A';
        elemBotList.appendChild(elemEmptyDiv);
        return;
    }

    let tmpBotId, tmpBotStatus, tmpElemDivLeft, tmpElemDivRight;
    for(let i=0; i<cooking_bots.length; i++){
        tmpBotId = 'BOT #' + cooking_bots[i].id;
        tmpBotStatus = cooking_bots[i].status;
        if( cooking_bots[i].currentOrderId > 0 ){
            tmpBotStatus += ' (OrderId #'+cooking_bots[i].currentOrderId+')';
        }
        tmpElemDivLeft = createDivColS6(tmpBotId, 'left');
        tmpElemDivRight = createDivColS6(tmpBotStatus, 'right');

        elemBotList.appendChild(tmpElemDivLeft);
        elemBotList.appendChild(tmpElemDivRight);
    }
}

function updateUI(){
    const elemCustomerView = document.getElementById("customer_view");
    
    if( elemCustomerView.checkVisibility() ){
        refreshOrderList(orders_in_preparation, 'list_of_orders_in_preparation');
        refreshOrderList(orders_completed, 'list_of_completed_orders');
    }else{
        refreshBotList();
    }
}