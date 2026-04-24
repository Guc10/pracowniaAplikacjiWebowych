__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Gustaw Grześkowiak 4C"

import models.Teacher as t

class Subject:
    def __init__(self, _id: int, name: str, teacher: t):
        self._id = _id
        self.name = name
        self.teacher = teacher

    def __str__(self):
        return f"{self.name} {self.teacher}"
