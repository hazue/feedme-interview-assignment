const BOT_IDLE = 'IDLE';
const BOT_PREPARING = 'PREPARING';
const DEFAULT_COOKING_TIME_IN_MS = 10 * 1000;

class Bot{
    constructor(botId){
        this.id = botId;
        this.reset();
    }

    reset(){
        this.status = BOT_IDLE;
        this.timeUntilCurrentActionFinished = 0;    // 0 milliseconds
        this.currentOrderId = 0;
    }
    
    assignNewOrder(orderId){
        this.currentOrderId = orderId;
        this.status = BOT_PREPARING;
        this.timeUntilCurrentActionFinished = DEFAULT_COOKING_TIME_IN_MS;

    }

    //return orderId if cooking is completed
    //return 0 if cooking still in progress
    cook(){
        if( this.timeUntilCurrentActionFinished<=0 ){
            const completedOrderId = this.currentOrderId;
            this.reset();
            return completedOrderId;
        }

        this.status = BOT_PREPARING;
        this.timeUntilCurrentActionFinished -= TIME_TICKING_IN_MS;
        return 0;
    }



    // ==================================================
    // Static functions
    
    static addBot(){
        bot_counter++;
        cooking_bots.push(new Bot(bot_counter));
    }

    static removeBot(){
        //Remove bot in the last element of array
        const targetBot = cooking_bots.length-1;

        //const orderIdInPreparation = cooking_bots[targetBot].currentOrderId;
        cooking_bots.splice(targetBot, 1);
    }

    static giveBotUnassignedOrder(objBot){
        const tmpUnassignedOrder = Order.getOneUnassignedOrder();
        if( tmpUnassignedOrder == null ){
            return;
        }

        console.log('Assigning order id ['+tmpUnassignedOrder.id+'] to bot id ['+objBot.id+']');
        objBot.assignNewOrder(tmpUnassignedOrder.id);
        tmpUnassignedOrder.assignBotId(objBot.id);
        
    }

    static makeAllBotsWork(){
        let tmpOrderId = 0;
        for(let i=0; i<cooking_bots.length; i++){
            if( cooking_bots[i].status == BOT_IDLE ){
                this.giveBotUnassignedOrder(cooking_bots[i])
                continue;
            }

            tmpOrderId = cooking_bots[i].cook();
            if( tmpOrderId>0 ){
                Order.moveOrderToCompleted(tmpOrderId);
            }
        }
    }
}

