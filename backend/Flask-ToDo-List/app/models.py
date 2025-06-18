from app import db


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    done = db.Column(db.Boolean, default=False)

    def __init__(self, content):
        self.content = content

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "done": self.done,
        }

    def __repr__(self):
        return f"<Task {self.id}: {self.done}>"
