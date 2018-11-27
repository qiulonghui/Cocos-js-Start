"use strict";
cc._RF.push(module, 'd29a1ffZsZKcbOcPcnDbtJb', 'ScoreAnim');
// scripts/ScoreAnim.js

"use strict";

cc.Class({
    extends: cc.Component,

    init: function init(scoreFX) {
        this.scoreFX = scoreFX;
    },


    hideFX: function hideFX() {
        this.scoreFX.despawn();
    }
});

cc._RF.pop();