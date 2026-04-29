__copyright__: str = "Zespół Szkół Komunikacji"
__author__: str = "Gustaw Grześkowiak 4C"

import models.Book as b
import models.Reader as r

class Loan:
    def __init__(self, reader: r, book: b, days: int):
        self.reader: r = reader
        self.book: b = book
        self.days: int = days

    def get_feet(self):
        if self.days >= 14:
            return self.days - 14
        return 0