import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { Workspace } from "../models/workspace.model.js";
import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js"
import { loadWorkspace } from "../utils/access.js";

const MEMBER_FIELS = "fullName email avatar";

// Check for admin
const checkAdmin = ({ isAdmin }) => {
    if (!isAdmin) {
        throw new ApiError(403, "Only admins are authorized");
    }
}

// POST: /workspace 
export const createWorkspace = asyncHandler(async (req, res) => {
    // get workspace data
    const { name, description } = req.body;

    // check name and whitespace
    if (!name || !name.trim()) {
        throw new ApiError(400, "Workspace name is required")
    }

    // create workspace 
    const workspace = await Workspace.create({
        name,
        description,
        owner: req.user._id,
        members: [
            {
                user: req.user._id,
                role: "admin",
            },
        ],
    })

    // send response
    res.status(201).json( new ApiResponse(201, workspace, "Workspace created") );
})


// GET: /workspaces
export const getMyWorkspaces = asyncHandler(async (req, res) => {
    // find workspace in which user is memeber
    const workspace = await Workspace.find({
        "members.user": req.user._id,
    }).sort("-createdAt");

    // send response
    res.status(200).json({ data: { workspace } });
})


// GEt: /workspaces/workspaceId
export const getWorkspace = asyncHandler(async (req, res) => {
    // find workspace 
    const { workspace, isAdmin } = await loadWorkspace(
        req.params.workspaceId,
        req.user._id,
    );

    // pupulate user
    await workspace.populate( "members.user", MEMBER_FIELS );

    // send response
    res.json({
        data: { workspace, isAdmin },
    })
});



// PATCH:
export const updateWorkspace = asyncHandler( async(req, res) => {
    // Load workspace

    // check admin access

    // pick the name and description
})