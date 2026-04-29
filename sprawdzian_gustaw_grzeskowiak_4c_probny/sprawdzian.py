__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Gustaw Grześkowiak 4C"

import datetime
import json

from models.Grades import Grades
from models.Student import Student
from models.Subject import Subject
from models.Teacher import Teacher
from year_grade import year_grade

teachers: list[Teacher] = []
subjects: list[Subject] = []
students: list[Student] = []
grades: list[Grades] = []

with open('teachers.txt', 'r') as f:
    for line in f:
        parts = line.strip().split(' ')
        if len(parts) >= 3:
            teachers.append(Teacher(int(parts[0]), parts[1], parts[2]))

with open('subjects.txt', 'r') as f:
    for line in f:
        parts = line.strip().split(' ')
        teacher_id = int(parts[2])
        teacher = next((t for t in teachers if t._id == teacher_id), None)

        if teacher:
            subjects.append(Subject(int(parts[0]), parts[1], teacher))

with open('students.txt', 'r') as f:
    for line in f:
        parts = line.strip().split(' ')
        birthdate = datetime.datetime.strptime(parts[3], '%Y-%m-%d').date()
        students.append(Student(int(parts[0]), parts[1], parts[2], birthdate))

with open('grades.txt', 'r') as f:
    for line in f:
        parts = line.strip().split(' ')
        student_id = int(parts[0])
        subject_id = int(parts[1])
        grade_values = [int(g) for g in parts[2].split(',')]

        student = next((s for s in students if s._id == student_id), None)
        subject = next((s for s in subjects if s._id == subject_id), None)

        if student and subject:
            g = Grades(student, subject)
            for gv in grade_values:
                g.add_grade(gv)
            grades.append(g)

print("Oceny i średnie poszczególnych uczniów\n")

students_json: list[dict] = []

for student in students:
    print(f"{student}:")
    student_data: dict = {str(student): {}}

    for subject in subjects:
        student_grades = next((g for g in grades if g.student._id == student._id and g.subject._id == subject._id), None)
        if student_grades:
            avg = round(student_grades.get_average(), 2)
            yg = year_grade(avg)
            grades_str = ', '.join(str(g) for g in student_grades.get_grades())

            print(f"\t{subject.name}:")
            print(f"\t\tOceny: {grades_str}")
            print(f"\t\tŚrednia: {avg}")
            print(f"\t\tOcena końcowa: {yg}")

            student_data[str(student)][subject.name] = {
                "Oceny": grades_str,
                "Srednia": avg,
                "Ocena roczna": yg
            }

    students_json.append(student_data)
    print()

with open('students.json', 'w', encoding='utf-8') as f:
    json.dump(students_json, f, indent=4, ensure_ascii=False)

print('=' * 50)
print()

subjects_json: list[dict] = []

for subject in subjects:
    subject_grades = [g for g in grades if g.subject._id == subject._id]
    all_grades: list[int] = []
    for g in subject_grades:
        all_grades.extend(g.get_grades())

    avg = round(sum(all_grades) / len(all_grades), 2) if all_grades else 0.0
    grades_str = ', '.join(str(g) for g in all_grades)

    print(f"{subject.name}:")
    print(f"\tNauczyciel: {subject.teacher}")
    print(f"\tOceny: {grades_str}")
    print(f"\tŚrednia: {avg}")
    print()

    subjects_json.append({
        subject.name: {
            "Nauczyciel": str(subject.teacher),
            "Oceny": all_grades,
            "Srednia": avg
        }
    })

with open('subjects.json', 'w', encoding='utf-8') as f:
    json.dump(subjects_json, f, indent=4, ensure_ascii=False)