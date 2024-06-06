// scripts.js
const { Engine, Render, Runner, Bodies, World, Events, Body } = Matter;

const catEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
const shapes = [];

// Matter.js 물리 엔진 생성
const engine = Engine.create();
const world = engine.world;

// Renderer 생성
const render = Render.create({
    element: document.querySelector('.animation-container'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
    },
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// 바닥과 벽 생성
const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 10, { isStatic: true });
const leftWall = Bodies.rectangle(0, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true });
const rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 10, window.innerHeight, { isStatic: true });
World.add(world, [ground, leftWall, rightWall]);

function createRandomShape() {
    const randomEmoji = catEmojis[Math.floor(Math.random() * catEmojis.length)];
    const size = Math.random() * 30 + 20;

    const shape = Bodies.circle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, size / 2, {
        render: {
            sprite: {
                texture: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' height='${size}' width='${size}'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='${size}px'>${randomEmoji}</text></svg>`
            }
        }
    });

    // 초기 속도를 랜덤하게 설정
    const initialVelocity = {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10
    };
    Body.setVelocity(shape, initialVelocity);

    shapes.push(shape);
    World.add(world, shape);
}

function generateShapes() {
    for (let i = 0; i < 50; i++) {
        createRandomShape();
    }
}

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop + 100) {
        generateShapes();
        lastScrollTop = scrollTop;
    }
});

window.addEventListener('resize', () => {
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: window.innerWidth, y: window.innerHeight }
    });
});
