


 /**
* 游戏总管  管理游戏进度 
*/
module pokerGame{

	import Handler = Laya.Handler;  

	export class GameManager{
		
		public UIManager:GameUIManager;//游戏UI管理器
		public userData:UserData;//用户数据
		
		private pokerEvent:EventHandlePoker;//游戏事件管理器
		private tutorialEvent:EventHandleTutorial;//新手指引事件
		private settingEvent:EventHandlSetting;//设置事件
		private shopEvent:EventHandleShop;//商店购买事件

		private soundPlayer:SoundPlayer;//声音播放器
		

		constructor(){
			
			//设置版本控制类型为使用文件名映射的方式
       		Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
			//加载版本信息文件
        	Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.beginLoad)); 

		}
		public beginLoad()
		{
			this.Init();

		}
		public Init()
		{
			
			this.UIManager=new GameUIManager();
			
			this.userData= new UserData();

			this.UIManager.settingUI.FlushSetting(this.userData);
			this.UIManager.shopUI.FlushData(this.userData);
			this.UIManager.challengeUI.FlushUserData(this.userData);
			
			this.pokerEvent=new EventHandlePoker();
			this.pokerEvent.SetGameManager(this);

			this.tutorialEvent=new EventHandleTutorial();
			this.tutorialEvent.SetGameManager(this);

			this.settingEvent=new EventHandlSetting();
			this.settingEvent.SetGameManager(this);

			this.shopEvent=new EventHandleShop();
			this.shopEvent.SetGameManager(this);

			this.soundPlayer=new SoundPlayer(this.userData);


			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.UpdateGoldUI);//刷新金币
			


		}
		
	
	}
}
		


	