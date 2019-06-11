
class GameMain {
	public static app: GameMain = null;
	public static isGaming: boolean = false;
	public static Soundable: boolean = true;  // 记录是否静音
	public mShares: number = 0;                // 分享次数
	public static shareIndex: number = 0;      // 分享标记
	public mShareTimeArray: Array<string> = [];// 分享成功判定的时间数组
	public mShareCurrentTime: number = 0;      // 分享那一刻的时间戳
	public static isEnterIn: boolean = false;  // 记录是否是从排行榜或者接力链接进入游戏的

	// public otherGameId: string = '';                // 分享次数
	public wClick: string = '';                // 分享次数

	public gameType: number
	public otherGameId: number
	public mSDKVersion: string = "";           // 微信客户端基础库版本
	public mAdOn: boolean = true;              // 是否接通广告 true=>接通, false=>未接广告
	public mScreenHeight: number;              // 通过微信获取的屏幕高度
	public mScreenWidth: number;               // 通过微信获取的屏幕宽度
	public mWX
	//  wxMinPro = null;               // 微信及后台接口类
	public mPlayed: number = 0;                //记录单局游戏复活次数
	public pointPlayed: number = 0;             //埋点复活次数
	public rebirth_video: number = 0;          // 单局游戏视频复活计数
	public mUseCards: boolean = false;         // 记录是否使用复活卡
	public mMapLevel = 0;                     // 记录关卡(现在版本还没有关卡的概念,所以默认值都是0,以后可能会用到)
	public wRankData: Array<Object> = [];      // 世界排名当前已请求的数据
	public myLevel = 0;                       // 记录我的等级
	public mWXVersion: string = "";
	constructor() {
		//初始化微信小游戏
		Laya.MiniAdpter.init();
		//程序入口
		Laya.init(750, 1334, Laya.WebGL);


		//适配模式 宽度100%
		Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
		Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
		Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
		GameMain.app = this;
		this.initWXCore()
		// GameMain.app.mWX.fhOnoff = 1
		// this.begin()
	}
	public begin() {
		//加载版本信息文件
		// Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
		this.onUILoad()
	}
	private onUILoad() {
		//设置适配模式
		//Laya.stage.alignH="center";
		//Laya.stage.alignV="middle";
		//var modes:string = "fixedauto";
		//Laya.stage.scaleMode = this.modes;
		var chaingame = new pokerGame.GameManager();
		//Laya.date
		//		//Laya.LocalStorage.getItem();
		//Date
	}
	/* 初始化微信core */
	private initWXCore(): void {
		if (wxCore.uo == null) {
			new wxCore();
		}
		wxCore.uo.initWX(2);

	}
	/* 获取当前时间戳 */
	public getCurrTime(): number {
		var date: Date = new Date();
		return date.getTime();
	}
	/* 本地保存值 */
	public setLocalInfo(key: string, value: any) {
		wx.setStorageSync(key, value);
	}

	/* 本地取出值 */
	public getLocalInfo(key: string) {
		return wx.getStorageSync(key);
	}
	/* 提示信息 */
	public showMessage(msg: string, icon: string = "", image: string = ""): void {
		wx.showToast({
			title: msg,
			icon: icon,
			image: image,
			duration: 2000
		});
	}
}
new GameMain();