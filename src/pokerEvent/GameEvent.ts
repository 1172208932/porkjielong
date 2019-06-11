/**
* name 
*/
module pokerEvent{
		export class GameEvent {
			
				/** 一个空的 Event 对象。用于事件派发中转使用。*/
				public static EMPTY: string="EMPTY";
				
				//点击游戏开始
				public static OnGameStart: string="OnGameStart";
				
				//点击商店
				public static OnClickShop: string="OnClickShop";
				
				//点击每日挑战
				public static onClickChallenge:string="onClickChallenge";

				//点击设置
				public static onClickSetting:string="onClickSetting";

				//点击返回主界面
				public static onClickBackToMain:string="onClickBackToMain";

				//从商店返回
				public static onClickBackToMainFromShop:string="onClickBackToMainFromShop";

				//主界面点击显示popupUI
				public static onClickShowPopup:string="onClickShowPopup";

				//新游戏
				public static onClickNewGame:string="onClickNewGame";

				//重新开始
				public static onClickRetry:string="onClickRetry";

				//结束游戏
				public static onClickEndGame:string="onClickEndGame";
			

				//左手模式
				public static onClickSettingLeftHandMode:string="onClickLeftHandMode";
				public static onClickSettingSound:string="onClickSound";
				public static onClickSettingShowTimer:string="onClickShowTimer";
				public static onClickSettingThreecard:string="onClickThreecard";
				public static onClickSettingVigasMode:string="onClickVigasMode";

				//提示信息
				public static ShowMessage:string="ShowMessage";

	
				//撤销
				public static onClickBackStep:string="onClickBackStep";
				

	
				//清理tips
				public static ClearTips:string="ClearTips";

				//点击提示
				public static onClickTips:string="onClickTips";
				//点击明牌
				public static OnClickShowAllHiddenCard:string="ShowAllHiddenCard";
				//自动
				public static OnClickAutoBackToAceCardDeck:string="OnClickAutoBackToAceCardDeck";


				//游戏胜利的时候
				public static onGameWin:string="onGameWin";

				//游戏中点击商店
				public static onClickShopInGame:string="onClickShopInGame";

				
				//点击购买
				public static OnClickBuy:string="OnClickBuy";
				//点击试用
				public static OnClickTry:string="OnClickTry";
				//点击试用
				public static OnClickUse:string="OnClickUse";

			
			
				//购买成功
				public static OnBuySuccess:string="OnBuySuccess";
				//试用成功
				public static OnTrySuccess:string="OnTrySuccess";


				
				
				public static OnClickGameStartTutorial:string="OnClickGameStartTutorial";
				//开始新手指引
				public static StartTutorial:string="StartTutorial";
				//下一步新手指引
				public static CheckNextTutorial:string="CheckNextTutorial";
				
				//检测是否要提示自动play
				public static CheckAutoPlay:string="CheckAutoPlay";
				
				//刷新新手指引显示
				public static FlushTutorialRender:string="FlushTutorialRender";
				//结束新手指引
				public static EndTutorial:string="EndTutorial";

				//点击退出新手指引
				public static OnClickQuitTutorial:string ="OnClickQuitTutorial";
				//新手指引隐藏
				public static HideTutorial:string="HideTutorial";

				//开始新手指引
				public static OnGameStartTutorial:string="OnGameStartTutorial";

				//新手指引最后一步
				public static ShowLastTutorial:string="ShowLastTutorial";

				//背景音乐播放
				public static PlayMusic:string="PlayMusic";
				//音效播放
				public static PlaySound:string="PlaySound";


				//分享微信成功
				public static onShareWeChatSuccesse:string = "onShareWeChatSuccesse";
				
				//关闭自动完成的确认窗口
				public static onClickCLoseConfirmAutoPlayUI:string="onClickCLoseConfirmAutoPlayUI";

				//开始明牌
				public static ShowHiddenCard:string = "ShowHiddenCard";

				//更新UI中的金币数字
				public static UpdateGoldUI:string = "UpdateGoldUI";

				//所有TableUI加载完毕 top bottom跟 table
				public static onALLTableUILoadedDone:string ="onALLTableUILoadedDone";
				
				//某一个tableUI加载
				public static onTableUILoadedDone:string ="onTableUILoadedDone";

				public static onClickGoldUseShowCard:string ="onClickGoldUseShowCard";
				
		}
}