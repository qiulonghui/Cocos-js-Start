(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f82ebnnDidNx7Mececo5wVE', 'Game', __filename);
// scripts/Game.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Player = require("Player");
cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后的消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,

        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },

        // player节点，用于获取角色弹跳的高度，和控制角色行动开关
        player: {
            default: null,
            type: Player
        },

        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        btnNode: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        // 获取地平面的 y轴坐标
        this.groundY = this.ground.y + this.ground.height / 2;

        this.currentStar = null;
        this.currentStarX = 0;

        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;

        // 游戏的运行状态
        this.enabled = false;

        // // 生成一个新的星星
        // this.spawnNewStar();

        // // 初始化计分
        // this.score = 0;
    },
    onStartGame: function onStartGame() {
        // 分数初始化
        console.log('aaa');
        this.resetScore();
        // 游戏运行状态为true
        this.enabled = true;
        // 开始按钮和结束的提示隐藏
        this.btnNode.x = 3000;
        // this.gameOverNode.active = false;
        // 重置角色的位置和速度
        var cmpPlayer = this.player.getComponent('Player');
        cmpPlayer.startMoveAt(cc.v2(0, this.groundY));
        // 生成星星
        this.spawnNewStar();
    },
    gainScore: function gainScore() {
        this.score += 1;
        // 将分数更新到scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },
    resetScore: function resetScore() {
        this.score = 0;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },
    spawnNewStar: function spawnNewStar() {
        // 这个函数方法用来生成一个新的star 

        // 使用给定的预制资源生成一个新的节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加的Canvas节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存 Game对象引用
        console.log(this); // this指向当前组件
        console.log(newStar); // star节点
        console.log(newStar.getComponent('Star'));
        newStar.getComponent('Star').game = this;

        // 消失的时间在范围中取一个值
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0; // 重置计时器
        this.currentStar = newStar;
    },
    getNewStarPosition: function getNewStarPosition() {
        // 这个函数方法用来返回一个随机的x,y坐标
        var randX = 0;
        // 根据地平面位置和主角跳的高度，随机得到一个星星的y坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度， 随机得到一个星星x坐标
        var maxX = this.node.width / 2;
        console.log(this, this.node, this.node.width, this.ground.y);
        randX = (Math.random() - 0.5) * 2 * maxX;

        //返回星星的坐标
        return cc.v2(randX, randY);
    },
    gameOver: function gameOver() {
        this.player.enabled = false;
        this.player.stopMove();
        this.currentStar.destroy();
        this.btnNode.x = 0;
    },
    update: function update(dt) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver();
            this.enabled = false;
            return;
        }
        this.timer += dt;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        