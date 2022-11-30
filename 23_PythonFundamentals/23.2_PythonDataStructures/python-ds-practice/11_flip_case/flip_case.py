def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """

    output_str = ""

    for letter in phrase:
        if letter == to_swap.lower() or letter == to_swap.upper():
            if letter.islower():
                output_str = output_str + letter.upper()

            elif letter.isupper():
                output_str = output_str + letter.lower()
        else:
            output_str = output_str + letter
        
    return output_str