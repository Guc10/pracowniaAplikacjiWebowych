__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Gustaw Grześkowiak 4C"

def year_grade(average: float):
    if average >= 5.5:
        return 6
    elif 4.7 <= average < 5.5:
        return 5
    elif 3.7 <= average < 4.7:
        return 4
    elif 2.7 <= average < 3.7:
        return 3
    elif 1.85 <= average < 2.7:
        return 2
    elif average < 1.85:
        return 1
    return None
