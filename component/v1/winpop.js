(function(window,jQuery,undefined){   
    
    var HTMLS = {
        'ovl':'<div class="J_container"><div class="J_mask"></div><div class="J_ovl"><div class="J_main"></div><div class="J_buttons"></div></div></div>',
        'alert':'<div class="J_button_alert J_btn">Sure</div>',
        'confirm':'<input type="button" class="J_button_sure J_btn" value="Sure"/><input type="button" class="J_button_false J_btn" value="No"/>'
    };
    var Winpop = function(){
        var config = {}; ////use as a space to add object to winpop
        this.set = function(n,v){
            config[n] = v;
        }
        this.get = function(n){
            return config[n];
        }
        this.init();
    }
    Winpop.prototype = {
        init:function(){
            this.createDom();
            this.bindEvent();
        },
        createDom:function(){
            var body = jQuery('body');
            var ovl = jQuery('.J_ovl');
            if(ovl.length ==0){
            //if(!body.has(ovl)){####
                body.append(HTMLS.ovl);
            }
            this.set('ovl',jQuery('.J_ovl'));
            this.set('mask',jQuery('.J_mask'));
        },
        bindEvent:function(){
            var that = this;
            //jQuery('.J_ovl').on('click','.J_button_alert');####
            var ovl = that.get('ovl');
            var mask = that.get('mask');
            ovl.on('click','.J_button_alert',function(){
                that.hide();
            });
            ovl.on('click','.J_button_sure',function(){
                var cb = that.get("confirmBack");
                that.hide();
                cb && cb(true);
            });
            ovl.on('click','.J_button_false',function(){
                var cb = that.get("confirmBack");
                that.hide();
                cb && cb(false);
            });
        },
        alert:function(str,btnstr){/// btnstr?????
            var str = typeof str=="string"?str:str.toString();
            var ovl = this.get('ovl');
            this.set("type","alert");
            ovl.find(".J_main").html(str);
            if(typeof btnstr == 'undefined'){
                ovl.find('.J_buttons').html(HTMLS.alert);
            }else{
                ovl.find('.J_buttons').html(btnstr);
            }
            this.show();
        },
        confirm:function(str,callback){
            var str = typeof str=="string"?str:str.toString();
            console.log(str);
            var ovl = this.get('ovl');
            this.set("type","confirm");
            ovl.find(".J_main").html(str);
            ovl.find(".J_buttons").html(HTMLS.confirm);
            this.set("confirmBack",(callback || function(){}));
            this.show();
        },
        show:function(){
            this.get('ovl').show();
            this.get('mask').show();
            //this.get('ovl').css('display','block');#####
        },
        hide:function(){
            var ovl = this.get('ovl');
            ovl.find('.J_main').html("");
            ovl.find('.J_buttons').html("");
            ovl.hide();
            this.get('mask').hide();
        },
        destory:function(){
            this.get("ovl").remove();
            this.get("mask").remove();
            delete window.alert;
            delete window.confirm;
        }  
    };
    
    var obj = new Winpop();
    window.alert = function(str){
        obj.alert.call(obj,str);
    };
    window.confirm = function(str,cb){
        obj.confirm.call(obj,str,cb);
    };
    
    })(window,jQuery);