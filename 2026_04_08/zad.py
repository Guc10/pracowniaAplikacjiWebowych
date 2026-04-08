def list_to_matrix(graph_list, n):
    matrix = [[0] * n for _ in range(n)]

    for line in graph_list:
        node = line[0]
        for neighbor in line[1:]:
            if neighbor != node:
                matrix[node][neighbor] = 1
                matrix[neighbor][node] = 1

    return matrix


def write_matrix(matrix):
    print("Macierz sąsiedztwa:")
    for row in matrix:
        print(" ".join(map(str, row)))


def write_neighbours_list(arr):
    print("Lista sąsiedztwa:")
    for line in arr:
        node = line[0]
        neighbors = line[1:]
        print(f"{node} ma sąsiadów:", ", ".join(map(str, neighbors)))


def read_graph(name):
    with open(name) as f:
        n = int(f.readline())
        arr = []

        for line in f:
            nums = line.strip()
            if not nums:
                continue
            arr.append([int(x) for x in nums])

        return n, arr


def main():
    num_of_nodes, arr = read_graph("grafy.txt")

    print("Liczba wierzchołków:", num_of_nodes)
    write_neighbours_list(arr)

    matrix = list_to_matrix(arr, num_of_nodes)
    write_matrix(matrix)


if __name__ == "__main__":
    main()
