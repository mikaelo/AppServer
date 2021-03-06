define([
    'jquery',
    'backbone',
    'underscore',
    //'models/model',
    'text!templates/header.html','context','signalr','noext!sr/signalr/hubs'],
    function($, Backbone, _, template, context){
        var View = Backbone.View.extend({
            el: '#header',
            initialize: function () {
                _(this).bindAll('onHeartBeat');
                this.notifications = $.connection.uiNotificationHub;
                $.connection.hub.url = context.signalRUrl('/signalr');
                this.notifications.client.HeartBeat=this.onHeartBeat;
                this.blinking=false;
            },
            onHeartBeat:function(){
                if(this.blinking)
                    return;
                this.blinking=true;
                var self=this;
                this.led.fadeTo(100,1,function(){
                    self.led.fadeTo(300,.25);
                    self.blinking=false;
                });
            },
            render: function () {
                this.template = _.template( template, { model: this.model.toJSON() } );
                $(this.el).html(this.template );
                this.led=$(this.el).find('.led').fadeTo(10,.25);

                $.connection.hub.start({
                    //SignalR is loaded via requireJs. In IE window load event is already fired at connection start. Thus signalr would wait forever if waitForPageLoad is true
                    waitForPageLoad: false
                });
                this.led.tooltip();
                this.rendered=true;
            },

            selectMenuItem: function (menuItem) {
                $('.topMenu li').removeClass('active');
                if (menuItem) {
                    $('.topMenu li.' + menuItem).addClass('active');
                }
            },
            'dispose':function(){
                if(this.rendered)
                    $.connection.hub.stop()
            }
        });

        return View;
    });