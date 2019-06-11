/**
* name 
*/
module poker{
	export class pokerChainGroup{
		public data:pokerGroupData;
		public render:pokerGroupRender;
	
		constructor(renderMode:PokerGroupRenderMode){
			this.data=new pokerGroupData();
			this.render=new pokerGroupRender(renderMode);

		}
		public FlushRender(withSort:boolean=true)
		{
			this.render.FlushPokerList(this.data,withSort);
		}
		public GetSortedPos(index:number):Laya.Point
		{
			 return this.render.GetSortedPos(index);
			//var tRet=new Laya.Point();
		}

	}
}