/**
* name 
*/
module pokerUI{
	export class setting{
		public settingPopup:ui.poker.settingPopupUI;

		private userData:pokerGame.UserData;

		constructor(){
			//	Laya.loader.load("res/atlas/UI.atlas",Laya.Handler.create(this,this.onUILoad));
			Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onUILoad));

		}
		public onUILoad()
		{
			this.settingPopup=new ui.poker.settingPopupUI();
			Laya.stage.addChild(this.settingPopup);
			this.settingPopup.visible=false;
			this.settingPopup.CloseBTN.on(Laya.Event.CLICK,this,this.ClickClosePopup);
			this.settingPopup.CloseBTN2.on(Laya.Event.CLICK,this,this.ClickClosePopup);
		

			this.settingPopup.soundBTNImg.on(Laya.Event.CLICK,this,this.onClickSound);
			this.settingPopup.timerBTN.on(Laya.Event.CLICK,this,this.onClickShowTimer);
			this.settingPopup.lefthandBTN.on(Laya.Event.CLICK,this,this.onClickLeftHand);
			this.settingPopup.ThreeCardBTN.on(Laya.Event.CLICK,this,this.onClickThreecard);
			this.settingPopup.VigasBTN.on(Laya.Event.CLICK,this,this.onClickVigasMode);
			

		


			if(this.userData!=null)
			{
				this.FlushSetting(this.userData);
			}


		}
		public ClickClosePopup()
		{
			this.settingPopup.visible=false;
			pokerGame.SoundPlayer.PlaySound(1);

		}

		public IsSelected(switchImg:Laya.Sprite):boolean
		{
			var state1=<Laya.Sprite>switchImg.getChildByName("state1");
			if(state1.alpha>0)
			{
				return true;
			}

			return false;
		}

		public IsSwtichAniPlaying(switchImg:Laya.Sprite):boolean
		{
			var state2=<Laya.Sprite>switchImg.getChildByName("state2");
			if(state2.alpha>0)
			{
				return true;
			}

			return false;
		}
		public Swtich(switchImg:Laya.Sprite):boolean
		{
		
			var state1=<Laya.Sprite>switchImg.getChildByName("state1");
			
			this.SetSwitchState(switchImg,!this.IsSelected(switchImg));
			//state1
			//state2
			//state3

			return true;

		}
		public SetSwitchState(switchImg:Laya.Sprite,isOn:boolean)
		{
			var state1=<Laya.Sprite>switchImg.getChildByName("state1");
			var state2=<Laya.Sprite>switchImg.getChildByName("state2");
			var state3=<Laya.Sprite>switchImg.getChildByName("state3");

			if(isOn)
			{
				var aniDruation=0.2;
				Laya.Tween.clearAll(state1);
				Laya.Tween.clearAll(state2);
				Laya.Tween.clearAll(state3);
				
				Laya.Tween.to(state3, { alpha: 0}, 0, Laya.Ease.sineIn, null, 0);
				Laya.Tween.to(state2, { alpha: 1}, 0, Laya.Ease.sineIn, null, 0);
				Laya.Tween.to(state2, { alpha: 0}, 0, Laya.Ease.sineIn, null, aniDruation*1);
				Laya.Tween.to(state1, { alpha: 1}, 0, Laya.Ease.sineIn, null, aniDruation*1);


				//Laya.
			}
			else
			{
				var aniDruation=0.2;
				Laya.Tween.clearAll(state1);
				Laya.Tween.clearAll(state2);
				Laya.Tween.clearAll(state3);
				
				Laya.Tween.to(state1, { alpha: 0}, 0, Laya.Ease.sineIn, null, 0);
				Laya.Tween.to(state2, { alpha: 1}, 0, Laya.Ease.sineIn, null, 0);
				Laya.Tween.to(state2, { alpha: 0}, 0, Laya.Ease.sineIn, null, aniDruation*1);
				Laya.Tween.to(state3, { alpha: 1}, 0, Laya.Ease.sineIn, null, aniDruation*1);
			}
		}
		public OnClickSwitch(switchImg:Laya.Sprite,event:string)
		{
			if(this.IsSwtichAniPlaying(switchImg))
			{
				return;
			}
			var selected=this.IsSelected(switchImg);

			this.Swtich(switchImg);

			GameGlobal.Dispatcher.GetInstance().brodcastEvent(event,[!selected]);
			pokerGame.SoundPlayer.PlaySound(1);
		
		}
		public onClickSound()
		{
			this.OnClickSwitch(this.settingPopup.soundSwitch,GameGlobal.EVENT.onClickSettingSound);
		}
		public onClickShowTimer()
		{
			this.OnClickSwitch(this.settingPopup.timerSwitch,GameGlobal.EVENT.onClickSettingShowTimer);
		}
		public onClickThreecard()
		{
			this.OnClickSwitch(this.settingPopup.threecardSwitch,GameGlobal.EVENT.onClickSettingThreecard);
		}
		public onClickVigasMode()
		{
			this.OnClickSwitch(this.settingPopup.vigasSwitch,GameGlobal.EVENT.onClickSettingVigasMode);
		}
		public onClickLeftHand()
		{
			this.OnClickSwitch(this.settingPopup.lefthandSwitch,GameGlobal.EVENT.onClickSettingLeftHandMode);
			
		}
		

		public FlushSetting(userData:pokerGame.UserData)
		{
			this.userData=userData;
			if(this.settingPopup!=null)
			{
				this.SetSwitchState(this.settingPopup.soundSwitch,this.userData.isSoundOn);
				this.SetSwitchState(this.settingPopup.timerSwitch,this.userData.isTimerOn);
				this.SetSwitchState(this.settingPopup.lefthandSwitch,this.userData.isLeftHand);
				this.SetSwitchState(this.settingPopup.threecardSwitch,this.userData.isThreeCardOnce);
				this.SetSwitchState(this.settingPopup.vigasSwitch,this.userData.isVigasMode);
				

				// this.settingPopup.soundSetting.selected=this.userData.isSoundOn;
				// this.settingPopup.showtimer.selected=this.userData.isTimerOn;
				// this.settingPopup.lefthand.selected=this.userData.isLeftHand;
				// this.settingPopup.threecard.selected=this.userData.isThreeCardOnce;
				// this.settingPopup.vigasMode.selected=this.userData.isVigasMode;
				this.userData=null;
			}

		

		}

	}
}