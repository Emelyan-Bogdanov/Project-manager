
from flask import Blueprint , jsonify
from ..modules import Message


message_bp = Blueprint("messages",__name__)

# get all messages of a workspace
@message_bp.route("/messages/<workspaceid>/")
def getAllMessages(workspaceid:int):
    
    messages = Message.query.filter_by(workspaceId=workspaceid)
    return jsonify([{
        "id":message.id,
        "text":message.text,
        "authorid":message.authorId,
        "workspaceId" : message.workspaceId
    } for message in messages])