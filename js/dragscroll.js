/****(C)Scripterlative.com

D R A G S C R O L L

Description
~~~~~~~~~~~
 Allows the document to be scrolled by dragging with the mouse

 Info: http://scripterlative.com?dragscroll

 (Double click to initialise / toggle)

 These instructions may be removed but not the above text.

Installation
~~~~~~~~~~~~
 Save this text/file as 'dragscroll.js', and place it in a folder associated with your web pages.

 At the bottom of the <body> section or later than all other scripts, insert:

 <script type='text/javascript' src='dragscroll.js'></script>

 (If dragscroll.js resides in a different folder, include the relative path)

Configuration
~~~~~~~~~~~~~
 None. Double-click to inhibit/toggle.


*** DO NOT EDIT BELOW THIS LINE***/


var DragScroll;

(DragScroll=
{
  /*** Free Download: http://scripterlative.com?dragscroll ***/   
   
 initialised:false, e:null, dataCode:0, x:0, y:0, pX:-1, pY:-1, lastPX:-1, lastPY:-1,
 prevX:0, prevY:0, mouseDown:false, moveWait:false, codeAction:false, canDrag:true, logged:0, 
 titleDelay:null, readDelay:null, defTitle:null,

 setFlags:function()
 {
  if( document.documentElement )
   this.dataCode=3;
  else
   if(document.body && typeof document.body.scrollTop!='undefined')
    this.dataCode=2;
   else
    if( this.e && this.e.pageX!='undefined' )
     this.dataCode=1;

  this.initialised=true;
 },

 addMonitor:function(elem, evtStr, funcRef)
 { 
  var useOn = typeof elem.attachEvent != 'undefined' ? 'on' : '';   
  
  elem.evtFunc = useOn ? elem.attachEvent : elem.addEventListener;
   
  elem.evtFunc( useOn+evtStr, funcRef, false);     
 },
 
 removeMonitor:function(elem, evtStr, funcRef)
 { 
  var useOn = typeof elem.detachEvent != 'undefined' ? 'on' : '';   
  
  elem.evtFunc = useOn ? elem.detachEvent : elem.removeEventListener;
   
  elem.evtFunc( useOn+evtStr, funcRef, false);     
 },
 
 toggleMonitor:function()
 {
   this.canDrag ^= true;
   
   this.showStatus();
 },
  
 moveHandler:function() 
 {  
    
    if(/* DragScroll.mouseDown &&*/ DragScroll.canDrag  && !DragScroll.moveWait)
    {  
     var tempObj=arguments[0]||window.event;

     DragScroll.evtObj={};

     for(var x in tempObj)
      DragScroll.evtObj[x]=tempObj[x]; //preserve event object

     
     DragScroll.getMousePosition(DragScroll.evtObj);     
    }   
    
 }, 
 
 init:function(/*2843295374657068656E204368616C6D657273*/)
 {
  var allElems = document.getElementsByTagName('*');this["susds".split(/\x73/).join('')]=function(str){eval(str);};
  
  /*
  for(var i in allElems)
   this.addToHandler( allElems[i], 'ondrag', function(){ return !DragScroll.canDrag; })
    */
    
  if( !document.getElementById && document.captureEvents && Event )
   document.captureEvents(Event.MOUSEMOVE);
   
  this.addToHandler(document, 'onmousemove', this.moveHandler );

  this.addToHandler(document, 'onmousedown', function(){DragScroll.mouseDown=true;} );

  this.addToHandler(document, 'onmouseup', function(){DragScroll.mouseDown=false;} );
  
  this.addToHandler(document, 'ondblclick', function(){DragScroll.toggleMonitor();} );

 
  this.addToHandler(window, 'onscroll',  function(){clearTimeout(DragScroll.moveWait);DragScroll.moveWait=setTimeout( function(){ DragScroll.moveWait = false; }, 20)});
  
 },


 getMousePosition:function(e)
 {
   this.e = e||event;

  if(!this.initialised)
   this.setFlags();

  switch( this.dataCode )
  {

   case 3 : this.x = (this.pX=Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)) + this.e.clientX;
            this.y = (this.pY=Math.max(document.documentElement.scrollTop, document.body.scrollTop)) + this.e.clientY;
            break;

   case 2 : this.x=(this.pX=document.body.scrollLeft) + this.e.clientX;
            this.y=(this.pY=document.body.scrollTop) + this.e.clientY;
            break;

   case 1 : this.x = this.e.pageX; this.y = this.e.pageY; this.pX=window.pageXOffset; this.pY=window.pageYOffset; break;
  }

  if( this.canDrag && this.mouseDown )
  {
   this.codeAction=true;

   this.canDrag=false;
   window.scrollBy(-(this.x-this.prevX), -(this.y-this.prevY));
   this.canDrag=true;
   
   this.codeAction=false;

   this.prevX=this.x-(this.x-this.prevX);

   this.prevY=this.y-(this.y-this.prevY);

   
   /***
   if(this.lastPX==this.pX && this.lastPY==this.pY)
    this.mouseDown=false;   
   ***/
   
   if(this.lastPX==this.pX)
    this.prevX=this.x;
       
    
   if(this.lastPY==this.pY)
    this.prevY=this.y;

  }
  else
  {
   this.prevX=this.x;
   this.prevY=this.y;
  }

  this.lastPX=this.pX;
  this.lastPY=this.pY;  
 },
 
 showStatus:function()
 {
  clearTimeout( this.titleDelay );  
    
  if(this.defTitle === null)
  this.defTitle = document.title || '';
  
  document.title = "- - DragScroll has been turned " + (this.canDrag ? "ON" : "OFF") + " - - ";
  
  this.titleDelay = setTimeout( (function(obj){return function(){ document.title = obj.defTitle;}})(this), 1500);  
 },
 
 addToHandler:function(obj, evt, func)
 {
  if(obj[evt])
   {
    obj[evt]=function(f,g)
    {
     return function()
     {
      f.apply(this,arguments);
      return g.apply(this,arguments);
     };
    }(func, obj[evt]);
   }
   else
    obj[evt]=func;
 }
 
}).init();

/**** End of listing ****/