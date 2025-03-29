const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('main-question');
const successMessage = document.getElementById('success-message');
const image = document.getElementById('cute-image'); // 获取图片元素
const infoText = document.createElement('p'); // 创建新的段落元素
// const introductionText = document.getElementById('introduction-text');
infoText.id = 'info-text'; // 设置id 方便css调整
document.querySelector('.container').appendChild(infoText); // 将段落添加到 container 中
// document.querySelector('.container').insertBefore(infoText, introductionText); // 将段落添加到 container 中

// 图片数组
const sadImages = [
    'image/sad-image-1.jpg',
    'image/sad-image-2.jpg',
    'image/sad-image-3.jpg'
];

// "不可以" 按钮的备选文本
const noButtonTexts = [
    "再想想嘛~🥺",
    "我会伤心的哦💔",
    "求求了~😭",
    "不~要~嘛~"
];
let noTextIndex = 0;
let clickCount = 0;
let imageIndex = 0;
// 监听 "不可以" 按钮的点击事件
noBtn.addEventListener('click', () => {
    clickCount++;

    if (clickCount > 3) {
        // 禁用 "不可以" 按钮
        noBtn.style.display = 'none';
        infoText.textContent = "既见君子，云胡不喜？见姑娘口是心非的样子，索性我帮你选吧~";
        // return; // 停止执行后续代码
    }

    // 1. 增大 "可以" 按钮
    const currentYesFontSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    const currentYesPaddingX = parseFloat(window.getComputedStyle(yesBtn).paddingLeft); // 获取水平内边距
    const currentYesPaddingY = parseFloat(window.getComputedStyle(yesBtn).paddingTop);  // 获取垂直内边距

    yesBtn.style.fontSize = `${currentYesFontSize + 20}px`; // 每次增加 5px 字体大小
    yesBtn.style.padding = `${currentYesPaddingY + 12}px ${currentYesPaddingX + 6}px`; // 每次增加内边距

    // 2. (可选) 改变 "不可以" 按钮的文本
    noBtn.textContent = noButtonTexts[noTextIndex % noButtonTexts.length] + (clickCount > 1 ? ` (${clickCount})` : ''); // 循环使用备选文本, 并显示点击次数
    noTextIndex++;

    // 3. (可选) 稍微缩小 "不可以" 按钮 (增加难度)
     const currentNoScale = noBtn.style.transform ? parseFloat(noBtn.style.transform.replace('scale(', '').replace(')', '')) : 1;
     if (currentNoScale > 0.5) { // 防止缩得太小
         noBtn.style.transform = `scale(${currentNoScale * 0.85})`;
     }

    // 4. (可选) 更换图片为更可怜的表情？
    image.src = sadImages[imageIndex % sadImages.length];
    imageIndex++;

    // 5. 更新文字信息
    switch (clickCount) {
        case 1:
            infoText.textContent = "再考虑一下嘛~\n先做个学习搭子也行呀";
            break;
        case 2:
            infoText.textContent = "真的不嘛，我超可爱的\n万水千山我陪你去看啊";
            break;
        case 3:
            infoText.textContent = "娘娘三思啊...";
            break;
    }
});

// 监听 "可以" 按钮的点击事件
yesBtn.addEventListener('click', () => {
    // 隐藏问题和按钮
    question.style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';
    image.src = 'image/ending-1.jpg'; // (可选) 换成开心的图片

    // 显示成功消息
    successMessage.style.display = 'block';
    infoText.textContent = "";

    // 显示联系方式图片
    document.getElementById('contact-images').style.display = 'flex';

});