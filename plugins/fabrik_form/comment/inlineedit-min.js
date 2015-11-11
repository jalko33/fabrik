/*! Fabrik */
var InlineEdit=my.Class({options:{onComplete:function(){},onLoad:function(){},onKeyup:function(){},inputClass:"input",stripHtml:!0},constructor:function(a,b){this.options=$.append(this.options,b),this.element=a,this.originalText=a.get("html").replace(/<br>/gi,"\n"),this.input=$(document.createElement("textarea")).addClass(this.options.inputClass).css(this.element.getStyles("width","height","padding-top","padding-right","padding-bottom","padding-left","margin-top","margin-right","margin-bottom","margin-left","font-family","font-size","font-weight","line-height","border-top","border-right","border-bottom","border-left","background-color","color")).on("keyup",this.keyup.bind(this)).on("blur",this.complete.bind(this)).attr({value:this.originalText}),this.input.css("margin-left",this.input.css("margin-left").toInt()-1),this.originalWidth=this.element.css("width"),this.element.setStyles({visibility:"hidden",position:"absolute",width:this.element.offsetWidth}),this.input.inject(this.element,"after"),this.input.focus(),this.trigger("onLoad",[this.element,this.input])},keyup:function(a){a&&(this.trigger("onKeyup",[this.element,this.input,a]),this.element.html("enter"===a.key?this.getContent()+"&nbsp;":this.getContent()),"enter"===a.key&&this.input.on("keydown",this.newLine.bind(this)),this.input.css("height",this.element.offsetHeight),"esc"===a.key&&(this.element.text(this.originalText),this.end()))},getContent:function(){var a=this.input.value;return this.options.stripHtml&&(a=a.replace(/(<([^>]+)>)/gi,"")),a.replace(/\n/gi,"<br>")},newLine:function(){this.element.innerHTML=this.element.innerHTML.replace("&nbsp;",""),this.input.removeEvents("keydown")},complete:function(){this.element.html(this.getContent()),this.trigger("onComplete",this.element),this.end()},end:function(){this.input.destroy(),this.element.setStyles({visibility:"visible",position:"relative",width:this.originalWidth})}});Element.implement({inlineEdit:function(a){return new InlineEdit(this,a)}});