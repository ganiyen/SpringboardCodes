def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """

    #get individual words in the string into list elements
    words_arr = phrase.split(" ")

    output_list = []

    for word in words_arr:            #example: ["This", "is", "awesome"]
        output_str = ""
        output_str += word[0].upper() #capitalize first letter
        output_str += word[1:].lower()#lower case the remaining letters
        output_list.append(output_str)#append the titleized word into the output list

    return " ".join(output_list)     #join the titleized word, separated by a whitespace, to create the output titleized string
