__copyright__: str = "Zespół Szkół Komunikacji"
__author__: str = "Gustaw Grześkowiak 4C"

def loan_status(days: int) -> str:
    if days <= 14:
        return "OK"
    elif days <= 30:
        return "WARNING"
    else:
        return "OVERDUE"
