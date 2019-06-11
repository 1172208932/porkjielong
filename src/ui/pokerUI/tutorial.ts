/**
* name 
*/
module pokerUI{
	
	export class tutorial{
		
	public tutorialUI:ui.poker.tutorialUI;
	private tutorialConfigData:gameconfig.tutorialConfigData=new gameconfig.tutorialConfigData();
	private stepIndex:number=0;
	public stepDeckCardNum:number=0;
	//public tutorialHandAni:tutorialHandAni=new tutorialHandAni();
	constructor(){
		
			Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onUILoad));
		}

		public onUILoad()
		{
			this.tutorialUI=new ui.poker.tutorialUI();
			Laya.stage.addChild(this.tutorialUI);
			this.tutorialUI.visible=false;

			this.tutorialConfigData.StartLoad(new Laya.Handler(this,this.setup));
			this.tutorialUI.QuitTutorial.on(Laya.Event.CLICK,this,this.QuitTutorial);

			//this.tutorialUI.addChild(this.tutorialHandAni.tutorialHandAni);
			
		}
		private QuitTutorial()
		{
			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.OnClickQuitTutorial);
		}
	
		private setup()
		{

		}
		public StartTutorial()
		{
			this.stepIndex=-1;
			//this.ShowThisStepTutorial();
		}
		

		public ShowNextStepTutorial()
		{
			
			this.stepIndex++;
			this.ShowThisStepTutorial();
			
		}

	
		public ShowThisStepTutorial()
		{
			if(this.stepIndex<this.tutorialConfigData.tutorialItemList.length)
			{
			  	var tutorialItem = this.tutorialConfigData.tutorialItemList[this.stepIndex];
				this.ShowTutorialDesc(tutorialItem.DESC);

				if(this.stepIndex==this.tutorialConfigData.tutorialItemList.length-1)//最后一个
				{
					GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.ShowLastTutorial);
				}
			}
		}
		public GetTutorialItem():gameconfig.tutorialItem
		{
			if(this.stepIndex<this.tutorialConfigData.tutorialItemList.length)
			{
			  	var tutorialItem = this.tutorialConfigData.tutorialItemList[this.stepIndex];
				return tutorialItem;
			}
			return null;
		}
		private ShowTutorialDesc(tutorialDesc:string)
		{
			this.tutorialUI.visible=true;
			this.tutorialUI.tutorialDesc.text=tutorialDesc;

		}
		public HideTutorial()
		{
			this.tutorialUI.visible=false;

		}


	}
}