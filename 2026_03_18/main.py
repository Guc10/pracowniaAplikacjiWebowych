def zadanie_4_1(words):
    result = ""
    for i in range(39, len(words), 40):
        result += words[i][9]
    return result


def zadanie_4_2(words):
    max_unique = 0
    best_word = ""

    for word in words:
        unique_letters = len(set(word))
        if unique_letters > max_unique:
            max_unique = unique_letters
            best_word = word

    return best_word, max_unique


def zadanie_4_3(words):
    valid_words = []

    for word in words:
        ok = True
        for i in range(len(word)):
            for j in range(i + 1, len(word)):
                if abs(ord(word[i]) - ord(word[j])) > 10:
                    ok = False
                    break
            if not ok:
                break
        if ok:
            valid_words.append(word)

    return valid_words


def main():
    with open("przyklad.txt") as f:
        words = [line.strip() for line in f]

    with open("wyniki4.txt", "w") as out:
        # 4.1
        out.write("4.1\n")
        out.write(zadanie_4_1(words) + "\n")

        # 4.2
        out.write("4.2\n")
        word, count = zadanie_4_2(words)
        out.write(f"{word} {count}\n")

        # 4.3
        out.write("4.3\n")
        for w in zadanie_4_3(words):
            out.write(w + "\n")


if __name__ == "__main__":
    main()
