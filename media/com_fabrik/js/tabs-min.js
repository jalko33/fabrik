/*! Fabrik */
var Tabs=my.Class({constructor:function(a,b,c){this.editable=c,this.iconGen=new IconGenerator({scale:.5}),this.el=document.id(a),this.tabs={},this.build(b)},build:function(a){if(Fabrik.trigger("fabrik.history.off",this),this.editable){var b=new Element("a",{href:"#",events:{click:function(a){this.addWindow(a)}.bind(this)}});art=this.iconGen.create(icon.plus,{fill:{color:["#40B53E","#378F36"]}}),art.inject(b),this.el.adopt(new Element("li",{"class":"add",events:{click:function(a){this.addWindow(a)}.bind(this)}}).adopt([new Element("span").text("add"),b]))}a.each(function(a){this.add(a)}.bind(this)),this.setActive(a[0]);var c=function(){Fabrik.trigger("fabrik.history.on",this)};c.delay(500)},remove:function(a){var b;if("event"===typeOf(a)?(b=a.target.closest("li").find("span").get("text").trim(),a.stop()):b=a,window.confirm("Delete tab?")){if(Object.keys(this.tabs).length<=1)return void window.alert("you can not remove all tabs");var c=this.tabs[b];Fabrik.trigger("fabrik.tab.remove",[this,c]),delete this.tabs[b],c.destroy();var d=Object.keys(this.tabs)[0];this.setActive(this.tabs[d])}},addWindow:function(){var a=new Element("form");a.adopt(new Element("input",{name:"label",events:{keydown:function(a){"enter"===a.key&&a.stop()}}}),new Element("br"),new Element("input",{"class":"button",type:"button",events:{click:function(a){var b=a.target.parent().getElement("input[name=label]").get("value");return""===b?(window.alert("please supply a tab label"),!1):(this.add(b),void Fabrik.Windows[this.windowopts.id].close())}.bind(this)},value:"add"})),this.windowopts={id:"addTab",type:"modal",title:"Add",content:a,width:200,height:200,minimizable:!1,collapsible:!0};Fabrik.getWindow(this.windowopts)},add:function(a){var b=new Element("li",{events:{click:function(){this.setActive(b)}.bind(this),mouseover:function(){Fabrik.trigger("fabrik.tab.hover",[a])}}});b.adopt(new Element("span").text(a+" "));var c=new Element("a",{href:"#",events:{click:function(a){this.remove(a)}.bind(this)}});if(this.editable&&(art=this.iconGen.create(icon.cross),art.inject(c),b.adopt(c)),b.store("ref",a),this.editable){var d=this.el.getElement("li.add");b.inject(d,"before")}else b.inject(this.el,"inside");this.setActive(b),this.tabs[a]=b,Fabrik.trigger("fabrik.history.add",[this,this.remove,a,this.add,a]),Fabrik.trigger("fabrik.tab.add",[this,a])},setActive:function(a){var b="string"===typeOf(a)?a:a.retrieve("ref"),c=a;Fabrik.trigger("fabrik.tab.click",b),jQuery.each(this.tabs,function(a,d){d.removeClass("active"),d.addClass("inactive"),d.retrieve("ref")===b&&(c=d)}),c.addClass("active"),c.removeClass("inactive")},reorder:function(){}});