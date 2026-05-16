import os
import time
from flask import Blueprint, request, jsonify, current_app, send_file
from werkzeug.utils import secure_filename

images_bp = Blueprint("images", __name__)

@images_bp.route("/api/images/upload", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else "png"
    filename = f"{int(time.time())}_{secure_filename(file.filename)}"
    images_folder = current_app.config["IMAGES_FOLDER"]
    filepath = os.path.join(images_folder, filename)
    file.save(filepath)

    return jsonify({
        "success": True,
        "url": f"http://localhost:5000/api/images/{filename}",
        "path": f"images/{filename}",
        "filename": filename
    })

@images_bp.route("/api/images/<filename>")
def get_image(filename):
    images_folder = current_app.config["IMAGES_FOLDER"]
    filepath = os.path.join(images_folder, filename)
    if not os.path.exists(filepath):
        return jsonify({"error": "Image not found"}), 404
    return send_file(filepath)

@images_bp.route("/api/images/<filename>", methods=["DELETE"])
def delete_image(filename):
    images_folder = current_app.config["IMAGES_FOLDER"]
    filepath = os.path.join(images_folder, filename)
    if os.path.exists(filepath):
        os.remove(filepath)
    return jsonify({"success": True, "message": "Image deleted"})
