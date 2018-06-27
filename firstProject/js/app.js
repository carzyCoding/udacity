// 这是我们的玩家要躲避的敌人
let MaxY = 3;
let MinY = 1;
let MaxX = 0;
let MinX = -3;
let RangeX = MaxX-MinX;
let RangeY = MaxY - MinY;
let enemyNum = 4;
let blockWidth = 101;
let blockHeight = 83;
let blockNumX = 4;
let blockNum = 5;
let blockX = blockWidth * blockNum;
let MinXP = 0;
let MaxXP = 4;
let MinYP = 4;
let MaxYP = 5;
let RangeXP = MaxXP - MinXP;
let RangeYP = MaxYP - MinYP;
let offset = 20;

var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x*blockWidth;
    this.y = y*blockHeight - offset;
    this.speed = speed;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x+dt*blockWidth*this.speed;
    if (this.x > blockX){
        this.x = (MinX + Math.random()*RangeX)*blockWidth;
        this.y = (MinY + Math.round(Math.random()*RangeY))*blockHeight - 20;
    }

};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (x,y) {
    this.x = x*blockWidth;
    this.y = y*blockHeight - offset;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function () {
    if(this.y<(-offset)){
        this.x = (MinXP + Math.round(Math.random()*RangeXP))*blockWidth;
        this.y = (MinYP + Math.round(Math.random()*RangeYP))*blockHeight - offset;
    }
    allEnemies.forEach(enemy=> {
        if(((enemy.x<this.x && enemy.x+blockWidth > enemy.x) && ((enemy.y < this.y && enemy.y + blockHeight > this.y) || (enemy.y > this.y && enemy.y < this.y + blockHeight)))
            || ((enemy.x>this.x && enemy.x < this.x + blockWidth) && ((enemy.y + blockHeight > this.y && enemy.y<this.y+blockHeight) || (enemy.y>this.y && enemy.y<this.y + blockHeight)))
           ){
            console.log('enemy.x:'+enemy.x);
            console.log('enemy.y:'+enemy.y);
            console.log('this.x:'+this.x);
            console.log('this.y:'+this.y);
            this.x = (MinXP + Math.round(Math.random()*RangeXP))*blockWidth;
            this.y = (MinYP + Math.round(Math.random()*RangeYP))*blockHeight - offset;
        }
    })

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

Player.prototype.handleInput = function (direction) {
    switch (direction){
        case 'left':
            this.x = this.x - 101;
            if(this.x<0){
                this.x = this.x+101;
            }
            break;
        case 'up':
            this.y = this.y - 83;
            break;
        case 'right':
            this.x = this.x + 101;
            if(this.x>blockNumX*blockWidth){
                this.x = this.x-101;
            }
            break;
        case 'down':
            this.y = this.y + 83;
            if(this.y>blockNum*blockHeight){
                this.y = this.y-83;
            }
            break;
        default:
    }
}

// 现在实例化你的所有对象
let allEnemies = [];
for(let i=0;i<enemyNum;i++){
    let enemy = new Enemy(MinX + Math.random()*RangeX,MinY + Math.round(Math.random()*RangeY),1+Math.random()*2);
    allEnemies.push(enemy);
}
// 把玩家对象放进一个叫 player 的变量里面
let player = new Player(MinXP + Math.round(Math.random()*RangeXP),MinYP + Math.round(Math.random()*RangeYP));

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
