export function sendResponse(res, message, data, status = 200) {
  const body = data === undefined ? { message } : { message, data };
  res.status(status).json(body);
}
