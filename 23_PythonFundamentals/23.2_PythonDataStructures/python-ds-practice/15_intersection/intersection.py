def intersection(l1, l2):
    """Return intersection of two lists as a new list::
    
        >>> intersection([1, 2, 3], [2, 3, 4])
        [2, 3]
        
        >>> intersection([1, 2, 3], [1, 2, 3, 4])
        [1, 2, 3]
        
        >>> intersection([1, 2, 3], [3, 4])
        [3]
        
        >>> intersection([1, 2, 3], [4, 5, 6])
        []
    """
    output_list = []

    # for element in l1:
    #     if l2.count(element) >= 1:
    #         output_list.append(element)

    output_list = [element for element in l1 if l2.count(element) >= 1]
   
    return output_list
