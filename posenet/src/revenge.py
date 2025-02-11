def read_file_to_string(file_path):
    """Reads the content of a text file into a string.

    Args:
        file_path: The path to the text file.

    Returns:
        A string containing the content of the file, or None if an error occurs.
    """
    try:
        with open(file_path, 'r') as file:
            file_content = file.read()
            return file_content
    except FileNotFoundError:
        print(f"Error: File not found at path: {file_path}")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

monkeyboy = read_file_to_string('ShreyesBharat.txt')

with open("Test.txt", "a") as f:
    for i in range(8, 100):
        f.write(f"Name {i}: {monkeyboy}\n")
    f.write(f"Name {i+1}: Shreyes Bharat\n")