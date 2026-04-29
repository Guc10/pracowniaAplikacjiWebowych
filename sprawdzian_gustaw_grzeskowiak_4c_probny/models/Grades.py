__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Gustaw Grześkowiak 4C"

import models.Student as s
import models.Subject as sub

class Grades():
    def __init__(self, student: s, subject: sub):
        self.grades: list[int] = []
        self.student = student
        self.subject = subject

    def add_grade(self, grade: int):
        if grade < 1 or grade > 6:
            raise ValueError("Grade must be between 1 and 6")
        self.grades.append(grade)

    def get_grades(self):
        return self.grades

    def get_average(self):
        suma: int = 0
        for grade in self.grades:
            suma += grade
        return float(suma / len(self.grades))
