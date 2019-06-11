/**
* UI 管理类
*/
module pokerGame{
	export class GameUIManager{
		public shopUI:pokerUI.shop;
		public startGameUI:pokerUI.startGame;
		public pokerTable:pokerUI.pokerTable;
		public pokerTop:pokerUI.gameTop;
		public pokerBottom:pokerUI.gameBottom;
		public pokerPopup:pokerUI.gamePopup;
		public settingUI:pokerUI.setting;
		public winUI:pokerUI.win;
		public tutorialUI:pokerUI.tutorial;
		public challengeUI:pokerUI.challenge;
		public confirmAutoPlayUI:pokerUI.ConfirmAutoPlay;
		public confirmShowCard:pokerUI.ConfirmShowCard;
		constructor(){
			this.shopUI=new pokerUI.shop();
			this.pokerTable=new pokerUI.pokerTable();
			
			this.startGameUI=new pokerUI.startGame();
			this.pokerTop=new pokerUI.gameTop();
			this.pokerBottom=new pokerUI.gameBottom();
			this.pokerPopup=new pokerUI.gamePopup();
			this.settingUI=new pokerUI.setting();
			this.winUI=new pokerUI.win();
			this.tutorialUI=new pokerUI.tutorial();
			this.challengeUI=new pokerUI.challenge();
			this.confirmAutoPlayUI=new pokerUI.ConfirmAutoPlay();
			this.confirmShowCard=new pokerUI.ConfirmShowCard();

			
			
		}

		public IsAllTableUILoadDone():boolean
		{

			if(this.pokerTable==null||this.pokerTable.pokerTableUI==null)
			{
				return false;
			}


			if(this.pokerTop==null||this.pokerTop.gameTopUI==null)
			{
				return false;
			}

			if(this.pokerBottom==null||this.pokerBottom.gameBottom==null)
			{
				return false;
			}
			
			return true;

		}

		
	}
}