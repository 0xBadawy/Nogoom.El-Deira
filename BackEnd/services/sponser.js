import SponserModels from "../models/sponsers.js";
import { deleteOneParam, updateOne, getAll, createOne } from "./handler.js";



export const addSponser = createOne(SponserModels);
export const deleteSponser = deleteOneParam(SponserModels);
export const updateSponser = updateOne(SponserModels);
export const getSponser = getAll(SponserModels);