// This file is responsible for checking access 
import mongoose from "mongoose";

import { ApiError } from "./ApiError";
import { Project } from "../models/project.model";
import { Workspace } from "../models/workspace.model";

// validate mongoose id 
export const checkId = (id, name = "id") => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, `${name} is invalid`);
    }
};

// Find workspace and check if user belongs to it
export const loadWorkspace = async( workspaceId, userId ) => {
    // validate id
    checkId(workspaceId, "workspaceId");

    // find workspace 
    const workspace = await Workspace.findOne(workspaceId);

    if (!workspaceId) {
        throw new ApiError(404, "Workspace not found");
    }

    let memeber = null

    // check member using for loop 
    for (const item of workspace.members) {
        if (item.user.equals(userId)) {
            member = item;
            break;
        }
    }


    // if not member throw error 
    if (!member) {
        throw new ApiError(403, "You aren't member of this workspace");
    }

    // check admin role 
    const isAdmin = memeber.role === "admin";

    // return workspace with admin role 
    return { workspace, isAdmin };
}