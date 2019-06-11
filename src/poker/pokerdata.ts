
//扑克类型
enum PokerType {
	
    club = 1, //梅花
    diamond =2,//方块
    heart =3,//红桃
    spade =4, //黑桃
	king =5//大小王
}


module poker{

	//扑克数学数据
	export class pokerdata{
	
		public  IsCardBack:boolean;//是否为卡背面

		public mType: PokerType; 

		public mNum: number;//数字1-13   类型为大小王的时候  1小王 2大王  

		constructor(vType:PokerType,vNum:number){

			this.mType=vType;
			this.mNum=vNum;
			
		}
		public SetData(data:pokerdata)
		{
			this.mType=data.mType;
			this.mNum=data.mNum;
		}
		public static Getkey(type:PokerType,num:number):number//获得唯一key
		{
			return type*1000+num;
		}

		public Getkey():number//获得唯一key
		{
			return this.mType*1000+this.mNum;
		}
		public Clone():pokerdata
		{
			return new pokerdata(this.mType,this.mNum);
		}
		//是否为大王卡
		public  IsKing():boolean
		{
			return this.mType==PokerType.king;	
		}
		//是否为黑色的卡
		public  IsBlack():boolean
		{

			return this.mType==PokerType.club||this.mType==PokerType.spade;
		}
		//是否为红色的卡
		public  IsRed():boolean
		{

			return this.mType==PokerType.diamond||this.mType==PokerType.heart;
		}
	
	}
}