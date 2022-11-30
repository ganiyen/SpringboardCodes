def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
    output = ""

    #make lower case
    output = phrase.lower() #string is immutable, so the lower method will not change the string phrase
    
    # remove whitespaces
    output = output.replace(" ","") 

    return output == output[::-1]