"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FlowFieldEffect_instances, _FlowFieldEffect_ctx, _FlowFieldEffect_createGradient, _FlowFieldEffect_drawLine;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowFieldEffect = void 0;
class FlowFieldEffect {
    constructor(ctx, width, height) {
        _FlowFieldEffect_instances.add(this);
        _FlowFieldEffect_ctx.set(this, void 0);
        __classPrivateFieldSet(this, _FlowFieldEffect_ctx, ctx, "f");
        __classPrivateFieldGet(this, _FlowFieldEffect_ctx, "f").lineWidth = 1;
        this.width = width;
        this.height = height;
        this.lastTime = 0;
        this.interval = 1000 / 60;
        this.timer = 0;
        this.cellSize = 10;
        this.gradient;
        __classPrivateFieldGet(this, _FlowFieldEffect_instances, "m", _FlowFieldEffect_createGradient).call(this);
        __classPrivateFieldGet(this, _FlowFieldEffect_ctx, "f").strokeStyle = this.gradient;
        this.radius = 6;
        this.vr = 0.03;
    }
    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval) {
            __classPrivateFieldGet(this, _FlowFieldEffect_ctx, "f").clearRect(0, 0, this.width, this.height);
            this.radius += this.vr;
            if (this.radius > 5 || this.radius < -5)
                this.vr *= -1;
            for (let y = 0; y < this.height; y += this.cellSize) {
                for (let x = 0; x < this.width; x += this.cellSize) {
                    const angle = (Math.cos(mouse.x * x * 0.00001) + Math.sin(mouse.y * y * 0.0001)) *
                        this.radius;
                    __classPrivateFieldGet(this, _FlowFieldEffect_instances, "m", _FlowFieldEffect_drawLine).call(this, angle, x, y);
                }
            }
            this.timer = 0;
        }
        else {
            this.timer += deltaTime;
        }
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}
exports.FlowFieldEffect = FlowFieldEffect;
_FlowFieldEffect_ctx = new WeakMap(), _FlowFieldEffect_instances = new WeakSet(), _FlowFieldEffect_createGradient = function _FlowFieldEffect_createGradient() {
    this.gradient = __classPrivateFieldGet(this, _FlowFieldEffect_ctx, "f").createLinearGradient(0, 0, this.width, this.height);
    this.gradient.addColorStop('0.1', '#ff5c33');
    this.gradient.addColorStop('0.2', '#ff66b3');
    this.gradient.addColorStop('0.4', '#ccccff');
    this.gradient.addColorStop('0.6', '#b3ffff');
    this.gradient.addColorStop('0.8', '#80ff80');
    this.gradient.addColorStop('0.9', '#ffff33');
}, _FlowFieldEffect_drawLine = function _FlowFieldEffect_drawLine(angle, x, y) {
    let positionX = x;
    let positionY = y;
    let dx = mouse.x - positionX;
    let dy = mouse.y - positionY;
    let distance = dx * dx + dy * dy;
    if (distance > 600000)
        distance = 600000;
    else if (distance < 50000)
        distance = 50000;
    let length = distance / 10000;
    __classPrivateFieldGet(this, _FlowFieldEffect_ctx, "f").beginPath();
    __classPrivateFieldGet(this, _FlowFieldEffect_ctx, "f").moveTo(x, y);
    __classPrivateFieldGet(this, _FlowFieldEffect_ctx, "f").lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    __classPrivateFieldGet(this, _FlowFieldEffect_ctx, "f").stroke();
};
