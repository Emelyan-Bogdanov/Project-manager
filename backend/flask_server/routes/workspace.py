from flask import Blueprint , jsonify

workspace_bp = Blueprint("workspaces",__name__)

@workspace_bp.route("/workspaces")
def allWorkspaces():
    from ..modules import Workspace
    workspaces = Workspace.query.all()
    
    return jsonify([
        {
            "id": workspace.id,
            "name" : workspace.name,
            "description" : workspace.description,
            "iconPath" : workspace.iconPath
        }
     for workspace in workspaces])