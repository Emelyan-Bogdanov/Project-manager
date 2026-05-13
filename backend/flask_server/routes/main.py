from flask import Blueprint , jsonify
from ..modules import User , Workspace , Comment , Task , Message


main_bp = Blueprint("main",__name__)

@main_bp.route("/users")
def allUsers():
    # get all users
    users = User.query.all()
    
    return jsonify([{
        "id" : user.id,
        "username":f"{user.username}",
        "email" : user.email,
        # "password" : user.password
    } for user in users])        
    

