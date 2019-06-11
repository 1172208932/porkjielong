
declare class MoreGame {
    // 显示盒子
    static ShowList(groupList:any[], gname:string, jumpWrite:string[], appid:string, closeHandler:Laya.Handler, zorder:number,jumpHandler:Laya.Handler):void    
    // 主动关闭box页面
    static CloseList():void;
    // 随机获取一个推荐
    static GetIndexRandom(groupList:any[]):any
    // 随机获取多个推荐列表
    static GetIndexRandomList(groupList:any[], count:number):Array<any> ;
    // 获取所有推荐列表
    static GetIndexList(groupList:any[]):Array<any> ;
}


/**
 * 重要：<writeList[] 中定义的一定要加入到 game.json 文件中 "navigateToMiniProgramAppIdList": [] >
 * 注意，各自游戏需要把各自游戏的直条去掉。加上主盒子，保证10个，主盒子必须有
   "wx3c889b4f402e924e"     ,              //  神手		
   "wx64b31394dc02962b"     ,              //  最强炮塔	
   "wxbc263a31f4a052e7"     ,              //  飞刀大师	
   "wxee32187228632dc8"     ,              //  采油小怪	
   "wx7dbc2d3f669c582a"     ,              //  神秋千		
   "wx7758d12727d72cfb"     ,              //  超级串串串	
   "wxb4ac0c02cd5bbd13"     ,              //  建筑反应堆	
   "wx6ba7e97604569e11"     ,              //  小蝌蚪大冒险	
   "wxa3c7a590d37d9839"     ,              //  守护蛋蛋
   "wxba14c2c4a17df8b6"     ,              //  萌宠冲刺	
   "wxaa46e77919aec8d9"     ,              //  神手盒子（主盒子）  
**/

class WriteBoxList {
    static mWriteBox = [
        "wx3c889b4f402e924e"     ,              //  神手		
        "wx64b31394dc02962b"     ,              //  最强炮塔	
        "wxbc263a31f4a052e7"     ,              //  飞刀大师	
        "wxee32187228632dc8"     ,              //  采油小怪	
        "wx7dbc2d3f669c582a"     ,              //  神秋千		
        "wx7758d12727d72cfb"     ,              //  超级串串串	
        "wxb4ac0c02cd5bbd13"     ,              //  建筑反应堆	
        "wx6ba7e97604569e11"     ,              //  小蝌蚪大冒险	
        "wxa3c7a590d37d9839"     ,              //  守护蛋蛋	
        "wxaa46e77919aec8d9"                    //  神手盒子（主盒子）
    ] ;
}