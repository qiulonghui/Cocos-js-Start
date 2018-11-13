"use strict";
cc._RF.push(module, 'f82ebnnDidNx7Mececo5wVE', 'Game');
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
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        // 获取地平面的 y轴坐标
        this.groundY = this.ground.y + this.ground.height / 2;

        // 生成一个新的星星
        this.spawnNewStar();
    },
    spawnNewStar: function spawnNewStar() {
        // 这个函数方法用来生成一个新的star 

        // 使用给定的预制资源生成一个新的节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加的Canvas节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
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
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();