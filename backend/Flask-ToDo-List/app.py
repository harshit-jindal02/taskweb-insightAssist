from app import app, db

# Ensure all tables are created if they do not exist
with app.app_context():
    db.create_all()


@app.shell_context_processor
def make_shell_context():
    return {"db": db}
