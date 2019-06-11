/**
* name 
*/
module gameconfig{
	export class tutorialItem{
		public Type:pokerGame.pokerDeckType;
		public NUM:number;
		public INDEX:number;

		public Type2:pokerGame.pokerDeckType;
		public NUM2:number;
		public INDEX2:number;

		public DESC:string;//描述



		constructor(jsonCell:JSON){

			this.Type=<pokerGame.pokerDeckType>(<number>jsonCell["TYPE"]);
			this.Type2=<pokerGame.pokerDeckType>(<number>jsonCell["TYPE_2"]);
			

			this.NUM=<number>jsonCell["NUM"];
			this.NUM2=<number>jsonCell["NUM_2"];
			
			this.INDEX=<number>jsonCell["Index"];
			this.INDEX2=<number>jsonCell["Index_2"];

			this.DESC=<string>jsonCell["DESC"];


		}
	}
}