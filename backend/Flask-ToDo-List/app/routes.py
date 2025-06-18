from app import app, db
from app.models import Task
from flask import request, jsonify


from sqlalchemy.exc import OperationalError


@app.route("/api/todos", methods=["GET"])
def api_get_todos():
    try:
        tasks = Task.query.all()
    except OperationalError as e:
        if "no such table" in str(e):
            from app import db

            db.create_all()
            tasks = Task.query.all()
        else:
            raise
    result = [task.to_dict() for task in tasks]
    return jsonify(result)


@app.route("/task", methods=["POST"])
def add_task():
    if request.is_json:
        content = request.json.get("content")
    else:
        content = request.form.get("content")
    if not content:
        return jsonify({"error": "Please enter text for your task"}), 400
    task = Task(content)
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201


@app.route("/toggle", methods=["POST"])
def toggle_status():
    if request.is_json:
        task_id = request.json.get("task_id")
    else:
        task_id = request.form.get("task_id")
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    task.done = not task.done
    db.session.commit()
    return jsonify(task.to_dict()), 200


@app.route("/edit", methods=["POST"])
def edit_task():
    if request.is_json:
        task_id = request.json.get("task_id")
        edit_text = request.json.get("edit_text")
    else:
        task_id = request.form.get("task_id")
        edit_text = request.form.get("edit_text")
    if not edit_text:
        return jsonify({"error": "Please enter text for your task"}), 400
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    task.content = edit_text
    db.session.commit()
    return jsonify(task.to_dict()), 200


@app.route("/delete/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({"result": "Task deleted", "id": task_id}), 200


@app.route("/finished", methods=["POST"])
def resolve_tasks():
    tasks = Task.query.all()
    for task in tasks:
        if not task.done:
            task.done = True
    db.session.commit()
    return jsonify([task.to_dict() for task in tasks]), 200
