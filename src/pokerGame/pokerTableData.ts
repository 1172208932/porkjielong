/**
*  牌桌数据

*/
module pokerGame{
	export class pokerTableData{

		public timerCountKeep:number=0;//keep数据的时候，记录时间

		public cardDecksData:CardDeckData=new CardDeckData();

		public cardControls:CardControls=new CardControls();
		
		public cardTips:CardTips=new CardTips();

		constructor(){
			this.cardControls.deckData=this.cardDecksData;
			this.cardTips.deckData=this.cardDecksData;
		}
		
	
		public AddToTable(table:ui.poker.pokerTableUI,tableTop:ui.poker.gameTopUI,tableBottom:ui.poker.gameBottomUI)
		{
			this.cardDecksData.AddToTable(table);
			this.cardControls.SetTableClick(table,tableTop,tableBottom);

		}
		
		public RemoveFromTable()
		{
			this.cardDecksData.table.offAll();
			this.cardDecksData.RemoveFromTable();
			
	
		}
	

	}
}