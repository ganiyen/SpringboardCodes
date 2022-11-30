def sum_pairs(nums, goal):
    # """Return tuple of first pair of nums that sum to goal.

    # For example:

    #     >>> sum_pairs([1, 2, 2, 10], 4)
    #     (2, 2)

    # (4, 2) sum to 6, and come before (5, 1):

    #     >>> sum_pairs([4, 2, 10, 5, 1], 6) # (4, 2)
    #     (4, 2)

    # (4, 3) sum to 7, and finish before (5, 2):

    #     >>> sum_pairs([5, 1, 4, 8, 3, 2], 7)
    #     (4, 3)

    # No pairs sum to 100, so return empty tuple:

    #     >>> sum_pairs([11, 20, 4, 2, 1, 5], 100)
    #     ()
    # """
    nums_length = len(nums)

    pair_index = []

    for i in range(0,nums_length-1):
        copy_nums = nums.copy()
        for j in range(i+1,nums_length-1):
            copy_nums[j] = copy_nums[j] + nums[i]
            if copy_nums[j] == goal:
                temp_arr = [i, j]
                pair_index.append(temp_arr)

    if len(pair_index) == 0:
        return ()


    smallest_index = pair_index[0][1]; 
    ans = [pair_index[0][0], pair_index[0][1]]

    for i in range(0,len(pair_index)):
        # print("enter loop")
        if pair_index[i][1] < smallest_index:
            ans = [pair_index[i][0], pair_index[i][1]]

    return (nums[ans[0]], nums[ans[1]])

                
