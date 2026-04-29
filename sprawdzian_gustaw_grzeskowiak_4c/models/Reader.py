__copyright__: str = "Zespół Szkół Komunikacji"
__author__: str = "Gustaw Grześkowiak 4C"

import datetime as dt

class Reader:
    def __init__(self, _id: int, first_name: str, last_name: str, birth_date: dt.date):
        self._id: int = _id
        self.first_name: str = first_name
        self.last_name: str = last_name
        self.birth_date: dt.date = birth_date

    @property
    def age(self) -> int:
        return dt.date.today().year - self.birth_date.year

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name} ({self.age})"