/**
* name 
*/
module pokerUI{
	export class challenge{

		public selectDateStr:string="";
		private SelectedDayCell:Laya.Box=null;

		public static selectChallengeDateStr:string="";//准备挑战的
		public static nowChallengeDateStr:string="";//正在挑战的


		public challengeUI:ui.poker.challengeUI;
		public userdata:pokerGame.UserData;
		public IsInit:boolean=false;
		
		private shoingTimeStemp:number=0;
		private monthNumCanShow=4;//最多显示4个月的
		
		constructor(){
				Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onUILoad));
		}

		public onUILoad()
		{
			this.challengeUI=new ui.poker.challengeUI();
			Laya.stage.addChild(this.challengeUI);
			this.challengeUI.visible=false;
	
			this.initWeekName();
			this.initButtonClick();
			this.IsInit=true;
			this.FlushData();
			
		
		}
		private initButtonClick()
		{
			this.challengeUI.preMonth.clickHandler=new Laya.Handler(this,this.ClickPreMonth);
			this.challengeUI.nextMonth.clickHandler=new Laya.Handler(this,this.ClickNextMonth);

			this.challengeUI.startChallenge.clickHandler=new Laya.Handler(this,this.ClickStartChallenge);

			this.challengeUI.CloseButton.on( Laya.Event.CLICK,this,this.CloseUI);
			this.challengeUI.CloseButton2.on( Laya.Event.CLICK,this,this.CloseUI);

			
		}
		public CloseUI()
		{
			this.challengeUI.visible=false;
		}
		public SetVisible(isVisible:boolean)
		{
			this.challengeUI.visible=isVisible;
		}
		public static GetDateString(date:Date):string
		{
			var year=date.getFullYear();
			var month=date.getMonth()+1;
			var day=date.getDate();
			var num=month;
			var monthStr=month>=10?num.toString():"0"+num.toString();
			num=day;
			var dayStr=day>=10?num.toString():"0"+num.toString();

			return year.toString()+monthStr+dayStr;
			
		}
		
		private onClickDays(cell:Laya.Box,dayNum:number)
		{
			// var data=new Date();
			// var todaysMonth=data.getMonth();
			// var todaysDay=data.getDate();
			//  data.setTime(this.shoingTimeStemp);
			//  if(data.getMonth()==todaysMonth)
			//  {
			// 	 if(dayNum>todaysDay)
			// 	 {
			// 		 return;
			// 	 }
			//  }
			//  if(this.SelectedDayCell!=null)
			//  {
				 
			// 	 var spr=<Laya.Sprite>this.SelectedDayCell.getChildByName("selectIMG");
			// 	 spr.visible=false;
			//  }
			//  this.SelectedDayCell=cell;

			

	
			// this.SetSelectDataString(this.shoingTimeStemp,dayNum);
		
			// var spr=<Laya.Sprite>cell.getChildByName("selectIMG");
			// spr.visible=true;
			
			// //this.challengeUI.selectIMG.removeSelf();
			// //this.challengeUI.selectIMG.pos(0,0);
			// //cell.addChild(this.challengeUI.selectIMG);

			// pokerGame.SoundPlayer.PlaySound(1);

		}
		private SetSelectDataString(date:Date)
		{
			this.selectDateStr=challenge.GetDateString(date);
			//console.debug("SetSelectDataString str="+this.selectDateStr);
			

		}

		private FlushButtonVisible()
		{
			this.challengeUI.preMonth.visible=this.IsMonthPluseVisible(-1);
			this.challengeUI.nextMonth.visible=this.IsMonthPluseVisible(1);

			
		}
		private IsMonthPluseVisible(pluseNum:number):boolean
		{
			var date=new Date();
			var  yearToday=date.getFullYear();
			var  monthToday=date.getMonth()+1;

		

			date.setTime(this.shoingTimeStemp);
			date.setMonth(date.getMonth()+pluseNum);

			var  yearPluse=date.getFullYear();
			var monthPluse=date.getMonth()+1;

			if(yearPluse!=yearToday)
			{
				if(yearPluse+1==yearToday)
				{
					return (monthToday+12-monthPluse)<=this.monthNumCanShow;
				}
				else
				{
					return false;
				}
			}

			if(monthPluse<=monthToday)
			{
				return (monthToday-monthPluse)<=this.monthNumCanShow;
			}
			


			return false;




		}
		private ClickStartChallenge()
		{
			if(this.selectDateStr!=null&&this.selectDateStr.length>0)
			{
				challenge.selectChallengeDateStr=this.selectDateStr;
				this.challengeUI.visible=false;
				GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickNewGame);
			}
			pokerGame.SoundPlayer.PlaySound(1);

		}
		public FlushChallengeDateStr()
		{
			if(challenge.selectChallengeDateStr!=null&&challenge.length>0)
			{
				challenge.nowChallengeDateStr=challenge.selectChallengeDateStr;
				challenge.selectChallengeDateStr=null;
			}
			else
			{
				challenge.nowChallengeDateStr=null;
			}
		}
		private ClickPreMonth()
		{
				if(this.shoingTimeStemp==0)
				{
					this.FlushData();
				}
				else
				{
					var date=new Date();
					date.setTime(this.shoingTimeStemp);
					date.setMonth(date.getMonth()-1);
					this.FlushDateList(date);
				}

		}
		public ClickNextMonth()
		{
				if(this.shoingTimeStemp==0)
				{
					this.FlushData();
				}
				else
				{
					var date=new Date();
					date.setTime(this.shoingTimeStemp);
					date.setMonth(date.getMonth()+1);
					this.FlushDateList(date);
				}
		}
		public initWeekName()
		{
			var cells=this.challengeUI.weekName.cells;
			

			for(var i=0;i<cells.length;i++)
			{
				this.SetWeekCell(<Laya.Box>cells[i],i+1);
			}

		}
		public SetWeekCell(cell:Laya.Box,posNum:number)
		{
				//var doneIMg= <Laya.Sprite>cell.getChildByName("doneImg");
				//doneIMg.visible=false;
				
				var weekName= <Laya.Text>cell.getChildByName("text");
				

				switch(posNum)
				{
					case 1:
					weekName.text="日";
					break;
					case 2:
					weekName.text="一";
					break;
					case 3:
					weekName.text="二";
					break;
					case 4:
					weekName.text="三";	
					break;
					case 5:
					weekName.text="四";	
					break;
					case 6:
					weekName.text="五";	
					break;
					case 7:
					weekName.text="六";	
					break;
					
				}

		}
		public FlushData()
		{
			
			var data=new Date();
			this.SetTodayText(data);
			
			var todaysDay=data.getDate();

			this.FlushDateList(data);
		


			
			//var day=data.getDay();
		
		}
		
		private GetMonthString(month:number)
		{
			switch(month)
			{
				case 1:
				return "一月";
				case 2:
				return "二月";
				case 3:
				return "三月";
				case 4:
				return "四月";
				case 5:
				return "五月";
				case 6:
				return "六月";
				case 7:
				return "七月";
				case 8:
				return "八月";
				case 9:
				return "九月";
				case 10:
				return "十月";
				case 11:
				return "十一月";
				case 12:
				return "十二月";
				
			}
			
		}
		private FlushDateList(date:Date)
		{
			this.shoingTimeStemp=date.valueOf();
			
			var cells=this.challengeUI.days.cells;
		
			var startMonth=date.getMonth();
			this.challengeUI.monthText.text=this.GetMonthString(startMonth+1);//.toString();
			date.setDate(1);
			var startDayOfWeek =date.getDay();//获得第一天的周日1-7

			var todaysData=new Date();
			this.SetSelectDataString(todaysData);
			
			var isTodayDone=false;
			for(var i=0;i<cells.length;i++)
			{	
				var cell=<Laya.Box>cells[i];
				var clickImg=<Laya.Sprite>cell.getChildByName("ClickIMG");
				clickImg.offAll();

				if(i<startDayOfWeek)
				{
					cell.visible=false;
					
					continue;
				}
				

				
				cell.visible=true;
				var dayIndex=i-startDayOfWeek;
				var dayNum=dayIndex+1;
				date.setDate(dayNum);

				if(date.getMonth()!=startMonth)
				{
					cell.visible=false;
					
					continue;
				}
				var IsSelect=this.IsSameDay(todaysData,date);
				var selectIMG=<Laya.Sprite>cell.getChildByName("selectIMG");
				selectIMG.visible=IsSelect;
	




				if(this.userdata!=null&&this.userdata.IsChallengePassed(challenge.GetDateString( date)))
				{
					var doneImg=<Laya.Sprite>cell.getChildByName("doneImg");
					doneImg.visible=true;

					var dayName=<Laya.Text>cell.getChildByName("text");
					dayName.visible=false;
					//dayName.offAll();
					//doneImg.on(Laya.Event.CLICK,this,this.onClickDays,[dayNum]);
					if(IsSelect)
					{
						isTodayDone=true;
					}

				}
				else
				{
					var doneImg=<Laya.Sprite>cell.getChildByName("doneImg");
					doneImg.visible=false;

					var dayName=<Laya.Text>cell.getChildByName("text");
					dayName.visible=true;
					dayName.text=(dayNum).toString();


				}
				
	
			}
			
			this.challengeUI.startChallenge.disabled=isTodayDone;
				
			this.challengeUI.startChallenge.label=isTodayDone?"已挑战":"开始挑战";

			//var date=date.getDate();
				this.FlushButtonVisible();


		}
		private IsSameDay(date1:Date,date2:Date)
		{
			if(date1.getFullYear()!=date2.getFullYear())
			{
				return false;
			}

			if(date1.getMonth()!=date2.getMonth())
			{
				return false;
			}

			if(date1.getDate()!=date2.getDate())
			{
				return false;
			}

			return true;
		}
		public SetTodayText(date:Date)
		{
			var year=date.getFullYear();
			var month=date.getMonth()+1;
			var day=date.getDate();

			this.challengeUI.today.text=year+"年"+month+"月"+day+"日";
		}

		public FlushUserData(userdata:pokerGame.UserData)
		{
			this.userdata=userdata;
			if(this.IsInit)
			{
				this.FlushData();
			}
		}

	}
}