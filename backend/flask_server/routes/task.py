
from flask import Blueprint
from ..modules import Task

task_bp = Blueprint("tasks",__name__)

@task_bp.route("/task/<taskid>")
def taskInfo(taskid:int):
    # try to find the task
    try :
        task = Task.query.get(taskid)
        return {
            "id":task.id,
            "title":task.title,
            "tags" : task.tags,
            "views" : task.views,
            "comments" : task.comments,
            "deadline" : task.deadline,
            "authorId" : task.authorId,
            "images" : task.images, # remember to convert to array using json loadString
        }
    except :
        print("ERROR WHILE GETTING THE TASK INFO USING ITS ID")
        {
            "id":"ERROR",
            "title":"ERROR",
            "tags" :"ERROR",
            "views" :"ERROR",
            "comments" :"ERROR",
            "deadline" :"ERROR",
            "authorId" :"ERROR",
            "images" :"ERROR",
        }
