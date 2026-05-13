import json
from flask import Blueprint, request, jsonify
from ..modules import Task, User, db

task_bp = Blueprint("tasks", __name__)

def parse_json_field(raw):
    if not raw:
        return []
    if isinstance(raw, list):
        return raw
    try:
        return json.loads(raw)
    except (json.JSONDecodeError, TypeError):
        try:
            return eval(raw)
        except:
            return [raw]

def task_to_dict(task):
    author = User.query.get(task.authorId) if task.authorId else None
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description or "",
        "tags": parse_json_field(task.tags),
        "images": parse_json_field(task.images),
        "deadline": task.deadline,
        "authorId": task.authorId,
        "authorName": author.username if author else "Utilisateur",
        "status": task.status,
        "priority": task.priority
    }

@task_bp.route("/tasks")
def all_tasks():
    tasks = Task.query.all()
    return jsonify([task_to_dict(t) for t in tasks])

@task_bp.route("/api/tasks")
def api_all_tasks():
    tasks = Task.query.all()
    return jsonify([task_to_dict(t) for t in tasks])

@task_bp.route("/addtask", methods=["POST"])
def add_task():
    data = request.json
    task = Task.add_task(
        title=data.get("title"),
        tags=data.get("tags"),
        description=data.get("description", ""),
        deadline=data.get("deadline"),
        authorId=data.get("authorId"),
        images=data.get("images", "[]"),
        priority=data.get("priority", 1),
        status=data.get("status", "todo")
    )
    return jsonify({"id": task.id, "message": "Task added"})

@task_bp.route("/task/<int:task_id>")
def task_info(task_id):
    try :
        task = Task.query.get(task_id)
        return jsonify(task_to_dict(task))
    except :
        print("ERROR WHILE GETTING THE TASK INFO USING ITS ID")
        return jsonify({"error": "Task not found"}), 404
