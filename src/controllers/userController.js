import { toRecordId } from "../database/recordId.js";
import * as userService from "../services/userService.js";
import { sendResponse } from "../utils/sendResponse.js";
import { validateNewUser } from "../validators/userValidator.js";

export async function getUsers(_req, res) {
  sendResponse(res, "Usuarios consultados correctamente", await userService.listUsers());
}

export async function getUser(req, res) {
  const profile = await userService.findUserProfile(toRecordId("user", req.params.userId));
  sendResponse(res, "Usuario consultado correctamente", profile);
}

export async function postUser(req, res) {
  const created = await userService.createUser(validateNewUser(req.body));
  sendResponse(res, "Usuario creado correctamente", created, 201);
}
