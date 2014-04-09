var PhysicScene = cc.Scene.extend({
    space: null,

    initPhysics:function() {
        
        this.space = new cp.Space();

        this.space.gravity = cp.v(0, -650);

        var winSize = cc.Director.getInstance().getWinSize();

        var staticBody = this.space.staticBody;
       
       var paredes = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(winSize.width,0), 0 ),               // bottom
            new cp.SegmentShape( staticBody, cp.v(0,winSize.height), cp.v(winSize.width,winSize.height), 0),    // top
            new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,winSize.height), 0),             // left
            new cp.SegmentShape( staticBody, cp.v(winSize.width,0), cp.v(winSize.width,winSize.height), 0)  // right
            ];

        for( var i=0; i < paredes.length; i++ ) {
            var forma = paredes[i];
            forma.setElasticity(1);
            forma.setFriction(1);
            this.space.addStaticShape( forma );
        }

    },
    onEnter:function () {
        this._super();
        this.initPhysics();
        var layer = new GameLayer(this.space);
        this.addChild(layer);

        this.scheduleUpdate();
    },

    update: function(dt) {
        this.space.step(dt);
    }
});

var GameLayer = cc.Layer.extend({

    ctor : function(space){
        this._super();
        this.space = space;
        this.init();
    },

    init:function(){
        this._super();

        // cc.PhysicsSprite cria um sprite que representará um corpo
        var ball = cc.PhysicsSprite.create("ball.png");
        this.addChild(ball);

        var raio = 32;

        // Criando o corpo físico que obedecerá as leis do espaço
        var corpo = this.space.addBody(new cp.Body(10, cp.momentForCircle(10, 0, raio, cp.v(0,0))));

        // Podemos escolher a forma do corpo, a elasticidade e a fricção dele!
        forma = this.space.addShape(new cp.CircleShape(corpo, raio, cp.v(0,0)));
        forma.setElasticity(0.6);
        forma.setFriction(1);

        var s = cc.Director.getInstance().getWinSize();
        corpo.setPos(cp.v(s.width/2, s.height/2));

        ball.setBody(corpo)

        var forcaX = (Math.random() * 5000) - 4000;
        var forcaY = 3000;

        corpo.applyImpulse(cp.v(forcaX, forcaY), cp.v(0, 0));
    },
});