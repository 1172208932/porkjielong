

/**
* 纸牌游戏规则
*/
module pokerGame{

	
import pokerChain = poker.pokerChain;
  



	export class ChainGameRule{
		
		public IsThreeCard:boolean=false;//每次三张
		public IsVegasMode:boolean=false;//每次仅能跳过三次
		public VegasModeJumpTime:number=3;//维加斯模式下跳过次数
		
		
		constructor(){

			
		}
		public  GetConnectErroMessage(poker1:pokerChain,poker2:pokerChain):number
		{
			if(poker1==null)
			{
				 //空的位置 只能放k
				 if(poker2.data.mNum==13)
				 {
					 return 10004;
				 }
				 return 0;
			}
			if(poker1.data.mNum!=poker2.data.mNum+1)
			{
				return 10002;
			}

			var IsPoker1Black:number=poker1.data.IsBlack()?1:0;
			var IsPoker2Black:number=poker2.data.IsBlack()?1:0;


			if(IsPoker1Black==IsPoker2Black)
			{

				return 10001;
			}
			
			return 0;
		}

		//是否可以连接两张牌
		public  IsCanConnect(poker1:pokerChain,poker2:pokerChain):boolean
		{

			//if(poker1.data.IsKing()||poker2.data.IsKing())//国王卡，在纸牌里面没有意义
			//{
			//	return false;
			//}
			if(poker1==null)
			{
				return poker2.data.mNum==13;//空的位置 只能放k
			}
			var IsPoker1Black:number=poker1.data.IsBlack()?1:0;
			var IsPoker2Black:number=poker2.data.IsBlack()?1:0;


			if(IsPoker1Black!=IsPoker2Black)
			{

				return poker1.data.mNum==poker2.data.mNum+1;
			}
			else
			{
				//console.log("poker1.data="+poker1.data.mType+"num="+poker1.data.mNum+" poker2.data="+poker2.data.mType+"num="+poker2.data.mNum);
			}

			return false;
		}


	public  GetTackBackErroMessage(pokerLastOneCard:pokerChain,pokerToTackBack:pokerChain):number
		{
			if(pokerLastOneCard==null)
			{
				if( pokerToTackBack.data.mNum!=1)
				{
					return 10003;
				}


			}
			if((pokerLastOneCard.data.mNum+1)!=pokerToTackBack.data.mNum)
			{	
				return 10002;
			}

			if(pokerLastOneCard.data.mType!=pokerToTackBack.data.mType)
			{
				return 10005;
			

			}


		}


		//是否可以收回牌
		//pokerLastOneCard：最后一张卡，可能为空
		//pokerToTackBack:想要收回的卡
		public  IsCanTackBack(pokerLastOneCard:pokerChain,pokerToTackBack:pokerChain):boolean
		{
			if(pokerLastOneCard==null)
			{
				return pokerToTackBack.data.mNum==1;

			}

			if(pokerLastOneCard.data.mType==pokerToTackBack.data.mType)
			{
				return (pokerLastOneCard.data.mNum+1)==pokerToTackBack.data.mNum;

			}


		}


	}
}

