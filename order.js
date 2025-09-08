const ORDER_TYPE_NORMAL = 'normal';
const ORDER_TYPE_VIP = 'VIP';

class Order {
    constructor(order_counter, type){
        this.id = order_counter.toString();
        this.botId = 0;
        this.priorityType = type;

        this.assignBotId = (botId)=>{
            this.botId = botId;
        }
    }
    

    // ==================================================
    // Static functions

    static addNormalOrder(){
        order_counter++;
        orders_in_preparation.push(new Order(order_counter, ORDER_TYPE_NORMAL));
    }

    static addVIPOrder(){
        order_counter++;
        const tmpOrder = new Order(order_counter, ORDER_TYPE_VIP);
        
        let indexToInsert = 0;
        //TODO: find the correct index
        orders_in_preparation.splice(indexToInsert, 0, tmpOrder);
    }

    static getOneUnassignedOrder(){
        for(let i=0; i<orders_in_preparation.length; i++){
            if( orders_in_preparation[i].botId == 0 ){
                return orders_in_preparation[i];
            }
        }

        return null;
    }

    
    static moveOrderToCompleted(orderId){
        let orderIndex = 0;
        for(let i=0; i<orders_in_preparation.length; i++){
            if( orders_in_preparation[i].id = orderId ){
                orderIndex = i;
                break;
            }
        }

        const newlyCompletedOrder = orders_in_preparation[orderIndex];
        orders_completed.push(newlyCompletedOrder); //TODO: Need to sort VIP for completed orders too?
        orders_in_preparation.splice(orderIndex, 1);
    }
}


