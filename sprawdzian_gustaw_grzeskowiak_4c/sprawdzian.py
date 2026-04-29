__copyright__: str = "Zespół Szkół Komunikacji"
__author__: str = "Gustaw Grześkowiak 4C"

import datetime
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

from models.Author import Author
from models.Book import Book
from models.Reader import Reader
from models.Loan import Loan
from loan_status import loan_status

BASE_DIR: str = os.path.dirname(__file__)

authors: list[Author] = []
with open(os.path.join(BASE_DIR, "authors.txt"), encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) == 3:
            _id, first_name, last_name = int(parts[0]), parts[1], parts[2]
            authors.append(Author(_id, first_name, last_name))

books: list[Book] = []
with open(os.path.join(BASE_DIR, "books.txt"), encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) == 4:
            _id, title, author_id, year = int(parts[0]), parts[1], int(parts[2]), int(parts[3])
            author = next((a for a in authors if a._id == author_id), None)
            if author is None:
                continue
            books.append(Book(_id, title, author, year))

readers: list[Reader] = []
with open(os.path.join(BASE_DIR, "readers.txt"), encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) == 4:
            _id, first_name, last_name, birthdate_str = int(parts[0]), parts[1], parts[2], parts[3]
            birth_date = datetime.datetime.strptime(birthdate_str, '%Y-%m-%d').date()
            readers.append(Reader(_id, first_name, last_name, birth_date))

loans: list[Loan] = []
with open(os.path.join(BASE_DIR, "loans.txt"), encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) == 3:
            reader_id, book_id, days = int(parts[0]), int(parts[1]), int(parts[2])
            reader = next((r for r in readers if r._id == reader_id), None)
            book = next((b for b in books if b._id == book_id), None)
            if reader is None or book is None:
                continue
            loans.append(Loan(reader, book, days))

print("Historia wypożyczeń")

readers_json: list[dict] = []

for reader in readers:
    reader_loans = [l for l in loans if l.reader._id == reader._id]
    print(f"{reader}:")
    reader_entries: list[dict] = []
    for loan in reader_loans:
        status = loan_status(loan.days)
        fee = loan.get_feet()
        print(f"Książka: {loan.book.title}")
        print(f"Dni: {loan.days}")
        print(f"Status: {status}")
        print(f"Opłata: {fee} zł")
        reader_entries.append({
            "Tytuł": loan.book.title,
            "Dni": loan.days,
            "Status": status,
            "Opłata": fee
        })
    print()
    readers_json.append({str(reader): reader_entries})

with open(os.path.join(BASE_DIR, "readers.json"), "w", encoding="utf-8") as f:
    json.dump(readers_json, f, indent=4, ensure_ascii=False)

print("=" * 30)
print()

books_json: list[dict] = []

for book in books:
    book_loans = [l for l in loans if l.book._id == book._id]
    count = len(book_loans)
    avg = round(sum(l.days for l in book_loans) / count, 1) if count > 0 else 0.0
    print(f"{book.title}:")
    print(f"Autor: {book.author}")
    print(f"Liczba wypożyczeń: {count}")
    print(f"Średni czas: {avg} dni")
    print()
    books_json.append({
        book.title: {
            "Autor": str(book.author),
            "Wypożyczenia": [l.days for l in book_loans],
            "Średnia": avg
        }
    })

with open(os.path.join(BASE_DIR, "books.json"), "w", encoding="utf-8") as f:
    json.dump(books_json, f, indent=4, ensure_ascii=False)
