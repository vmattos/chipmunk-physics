var PhysicScene = cc.Scene.extend({
    space: null,

    initPhysics:function() {
        
        this.space = new cp.Space();
       

    },
    onEnter:function () {
        this._super();
        this.initPhysics();
        var layer = new PhysicsLayer(this.space);
        this.addChild(layer);

        this.scheduleUpdate();
    },

    update: function(dt) {
        this.space.step(dt);
    }
});