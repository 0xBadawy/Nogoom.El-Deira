import MessageModels from "../models/messages.js";
import { deleteOneParam, updateOne, getAll, createOne } from "./handler.js";



export const addMessage = createOne(MessageModels);
export const deleteMessage = deleteOneParam(MessageModels);
export const updateMessage = updateOne(MessageModels);
export const getMessage = getAll(MessageModels);