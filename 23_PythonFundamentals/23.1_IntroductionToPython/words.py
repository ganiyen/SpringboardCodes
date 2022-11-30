def print_upper_words(wordsArr, must_start_with):
    """
    Prints an individual word from wordsArr in a separate line in the uppercase format. 
    The first letter of each printed word must satisfy must_start_with to be printed out. 
    """

    for word in wordsArr:
        if word[0] in must_start_with:
            print(word.upper());


print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                   must_start_with={"h", "y"})