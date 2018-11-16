"use strict";
cc._RF.push(module, '02533gPOchAkJkCwTfRN3CI', 'Star');
// scripts/Star.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 星星和主角的距离小于这个数值，就完成收集
        pickRadius: 0
    },

    getPlayerDistance: function getPlayerDistance() {
        console.log(this);
        // 根据 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        // 根据两点位置计算距离
        var dist = this.node.position.sub(playerPos).mag();

        return dist;
    },
    onPicked: function onPicked() {
        // 生成一个新的星星
        this.game.spawnNewStar();
        // 销毁当前星星节点
        this.node.destroy();
        // 调用 Game 脚本的得分方法
        this.game.gainScore();
    },
    update: function update(dt) {
        // 判断player和star的距离
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }

        // 更新星星的透明度
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
});

cc._RF.pop();