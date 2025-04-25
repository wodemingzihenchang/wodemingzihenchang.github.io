// 创建 pet 对象
// 宠物初始位置的横坐标 （左下角开始）
// vx水平方向上宠物前进的速度
// vy垂直方向上宠物前进的速度
const pet = { x: 50, y: 50, vx: 1, vy: 0 };
// -------------------------------------------------------------动作
// 动作权重
// 权重问题：将所有权重相加，（得到一个大范围，那么就让随机数落到这个范围内，而对应的权重，就是落到的对应位置中）
var actions = { walkleft: 1, walkright: 1, stand: 1, };
// 存储宠物行走动画帧的数组
const LeftwalkFrames = []; // 左走
const RightwalkFrames = []; // 右走
const DragFrames = [];  // 拖拽
const standFrames = [];
const fallingFrames = [];
// 初始化 定时器
var ttt = null;
var dragTime = null;
var action = 'stand';
//1、将对象中的动作按照权重转换为数组。可以使用 Object.keys 方法获取对象的键，
//2、再使用 Array.map 方法将每个键转换为对象 {name: key, weight: actions[key]}。
//3、最后使用 Array.reduce 方法将多个对象合成一个数组
var actionList = Object.keys(actions).map(function (key) { return { name: key, weight: actions[key] }; }).reduce(function (prev, curr) { return prev.concat(curr); }, []);
// 根据权重随机选择动作 
// 权重问题：将所有权重相加，（得到一个大范围，那么就让随机数落到这个范围内，而对应的权重，就是落到的对应位置中）

// -------------------------------------------------------------动作
const img111 = new Image();
img111.src = `./html网页宠物/max/falling1.png`;
fallingFrames.push(img111);
// 创建动画序列//将行走动画帧添加到 walkFrames 数组中
for (let i = 1; i < 13; i++) {

    const img = new Image();
    img.src = `./html网页宠物/max/walkright${i}.png`;
    RightwalkFrames.push(img);

    const img2 = new Image();
    img2.src = `./html网页宠物/max/walkleft${i}.png`;
    LeftwalkFrames.push(img2);

    const img3 = new Image();
    img3.src = `./html网页宠物/max/drag${i}.png`;
    DragFrames.push(img3);

    const img7 = new Image();
    img7.src = `./html网页宠物/max/stand${i}.png`;
    standFrames.push(img7);
}

// 随机动作
function randomAction() {
    var totalWeight = actionList.reduce(function (prev, curr) {
        return prev + curr.weight;
    }, 0);
    // console.log(totalWeight);

    var randomNum = Math.random() * totalWeight;

    for (var i = 0; i < actionList.length; i++) {
        if (randomNum <= actionList[i].weight) {
            return actionList[i].name;
        }
        randomNum -= actionList[i].weight;
    }
}

// 绘制宠物
function drawPet(anyFrames = RightwalkFrames) {
    const frameIndex = Math.floor(Date.now() / 100) % anyFrames.length;  // 计算当前应该绘制的动画帧的索引
    const img = anyFrames[frameIndex]; // 获取当前应该绘制的动画帧
    document.querySelector('.cywl img').src = img.src;  // 更新宠物的显示图像
}


// 更新宠物位置
function updatePet() {
    pet.x += pet.vx;   // 更新宠物在水平方向的位置
    // pet.y += pet.vy;
    // 超出屏幕左边
    if (pet.x < 0) { action = 'walkright' }
    // 超出屏幕右边
    if (pet.x + petDiv.clientWidth > window.innerWidth) { action = 'walkleft' }
    petDiv.style.left = pet.x + 'px';   // 更新宠物所在 div 元素的横坐标位置
    petDiv.style.bottom = pet.y + 'px';
}

// 宠物行动的定时器，每 3 秒执行一次 doAction 函数
var petTimer = setInterval(function name() { action = randomAction(); }, 3000);
// ----------------------------------------------------------------------
// 主循环
function loop() {
    console.log(action);
    if (action == 'walkleft') { pet.vx = -0.5; updatePet(); drawPet(LeftwalkFrames); }
    if (action == 'walkright') { pet.vx = 0.5; updatePet(); drawPet(RightwalkFrames); }
    if (action == 'stand') { drawPet(standFrames); }
    requestAnimationFrame(loop);  // 浏览器提供的 API，用于优化动画性能并在重绘之前在主线程上执行指定的函数
}
// 鼠标拖动
document.addEventListener('mousemove', function (event) {
    // 如果正在拖拽中，则更新盒子位置
    if (isDragging === true) {
        pet.x = event.clientX - diffX
        pet.y = event.clientY - diffY
        petDiv.style.left = pet.x + 'px';
        petDiv.style.top = pet.y + 'px';
    }
});
// 鼠标抬起
document.addEventListener('mouseup', function (event) {
    if (isDragging === true) {
        // 清除旧的定时器
        clearInterval(ttt);
        clearInterval(dragTime);
        // 停止拖拽
        isDragging = false;
        action = 'stand';
        ttt = setInterval(function name() {
            action = randomAction();
        }, 3000);
        // 超出屏幕 回到 指定位置 
        if (pet.y < 0 || pet.y + petDiv.clientHeight > window.innerHeight || pet.x + petDiv.clientWidth > window.innerWidth || pet.x < 0) {
            pet.x = 500;
            pet.y = 500;
            const petDiv = document.querySelector('#pet');
            petDiv.style.left = 500 + 'px';   // 更新宠物所在 div 元素的位置
            petDiv.style.top = 500 + 'px';
            // console.log(1111111)
        }
        // 显示下落 图片
        drawPet(fallingFrames);
        // animationId = requestAnimationFrame(loop);  // 浏览器提供的 API，用于优化动画性能并在重绘之前在主线程上执行指定的函数
        // loop();
    }
});