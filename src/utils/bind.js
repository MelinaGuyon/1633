function bind (fn, ctx, argCount = 0) {
  if (argCount === 0) return function () { fn.call(ctx) }
  else if (argCount === 1) return function (a) { fn.call(ctx, a) }
  else if (argCount === 2) return function (a, b) { fn.call(ctx, a, b) }
  else if (argCount === 3) return function (a, b, c) { fn.call(ctx, a, b, c) }
  else if (argCount === 4) return function (a, b, c, d) { fn.call(ctx, a, b, c, d) }
  else if (argCount === 5) return function (a, b, c, d, e) { fn.call(ctx, a, b, c, d, e) }
  else throw new Error('Too many arguments')
};

function bindMethod (ctx, method, argCount = 0) {
  ctx[method] = bind(ctx[method], ctx, argCount)
  return ctx[method]
}

function contextualBinder (ctx) {
  return function (method, argCount = 0) {
    ctx[method] = bind(ctx[method], ctx, argCount)
    return ctx[method]
  }
}

export { bind, bindMethod, contextualBinder }
export default bind
