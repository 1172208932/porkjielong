/**
* 连接的步骤数据
*/
module pokerGame{
	export class connectStep{

		public addToDeckType:pokerGame.pokerDeckType;//这步骤,加入的卡组的类型
		public addToDeckNum:number;//这个步骤,加入的卡组的标号
		public addToDeckIndex:number;//这个步骤,加入的卡组的  起始的卡index


		public fromDeckType:pokerGame.pokerDeckType;//这步骤,加入的卡组的类型
		public fromDeckNum:number;//这个步骤,加入的卡组的标号
		public isFromDeckChangeToFront:boolean;//线的时候有效,线的最后一个是否从卡背back变成了卡面front

	

		constructor(toType:pokerDeckType,toNum:number,toLength:number,fromType:pokerDeckType,fromNum:number,isFromBackToFront:boolean){

			this.addToDeckType=toType;
			this.addToDeckNum=toNum;
			this.addToDeckIndex=toLength;

			this.fromDeckType=fromType;
			this.fromDeckNum=fromNum;
			this.isFromDeckChangeToFront=isFromBackToFront;

		}

	}
}