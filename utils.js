function buildActionResult(method, actionCode, moveCode = null) {
  return { method, actionCode, moveCode };
}

module.exports = { buildActionResult };