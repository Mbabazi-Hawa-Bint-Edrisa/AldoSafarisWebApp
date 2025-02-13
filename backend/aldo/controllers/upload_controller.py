

import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename

upload_bp = Blueprint("upload_bp", __name__)

@upload_bp.route("/upload_image", methods=["POST"])
def upload_image():
    """
    Endpoint to upload an image file. 
    Expects multipart/form-data with a field named 'file'.
    Saves to static/uploads/<filename> and returns a JSON response 
    with { "path": "/static/uploads/<filename>" }.
    """
    if "file" not in request.files:
        return jsonify({"error": "No file field in request"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)

    upload_folder = os.path.join(current_app.root_path, "static", "uploads")
    os.makedirs(upload_folder, exist_ok=True)

    save_path = os.path.join(upload_folder, filename)
    file.save(save_path)

    public_path = f"/static/uploads/{filename}"

    return jsonify({"path": public_path}), 200
