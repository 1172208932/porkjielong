
import pokerRender = poker.pokerRender;

/**
* 接龙用的扑克结构体
*/
module poker {
	export class pokerChain {

		public data: pokerdata;//扑克数据
		public render: pokerRender  //扑克渲染体
		

		constructor(type: PokerType, num: number) {

			this.data = new pokerdata(type, num);
		}
		public Dispose()
		{
			if(this.render!=null)
			{
				this.render.Dispose();
			}

		}
		public CreateRender() {
			
			this.render = new pokerRender();
			this.render.ChangeRenderByData(this.data);
		
		}
		public FlushRender() {
			if (this.render == null) {
				this.CreateRender();
				
			}
			else {
				this.render.ChangeRenderByData(this.data);
			}

		}




	}
}