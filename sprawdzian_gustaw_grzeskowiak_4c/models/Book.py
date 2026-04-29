__copyright__: str = "Zespół Szkół Komunikacji"
__author__: str = "Gustaw Grześkowiak 4C"

import models.Author as a

class Book:
    def __init__(self, _id: int, title: str, author: a, year: int):
        self._id: int = _id
        self.title: str = title
        self.author: a = author
        self.year: int = year

    def __str__(self) -> str:
        return f"{self.title} ({self.year}) {self.author}"