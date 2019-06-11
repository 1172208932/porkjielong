/**
* name 
*/
module pokerUI{
	export class tutorialHandAni{

		//tutorialHand
		  public tutorialHandAni:Laya.Animation;
		constructor(){


 			//Laya.loader.load("res/atlas/role.atlas",Laya.Handler.create(this,this.onLoaded));
			Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onLoaded));
		}

	 private onLoaded():void{
    
     	//创建动画实例
        this.tutorialHandAni = new Laya.Animation();
		// Laya.stage.addChild(this.tutorialHandAni);
        //通过数组加载动画资源，然后用play方法直接播放。由于loadImages方法返回的是Animation对象本身，可以直接使用“loadImages(...).play(...);”语法。
        //var ani=this.tutorialHandAni.loadImages(this.aniUrls("tap_000",2));

        var ani=this.tutorialHandAni.loadAnimation("poker/tutorialHand.ani");
        ani.play();


			
    }
	  /**
     * 创建一组动画的url数组（美术资源地址数组）
     * aniName  动作的名称，用于生成url
     * length   动画最后一帧的索引值，
     */    
    private aniUrls(aniName:string,length:number):any{
        var urls:any = [];
        for(var i:number = 0;i<length;i++){
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push("UI/"+aniName+(i+1)+".png");
        }
        return urls;
    }


	}
}