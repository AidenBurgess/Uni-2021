def optimalCoinChange(x, denoms):
    # Function finds the minimum number of coins required to change a monetary
    # amount.
    # Inputs:
    # x = amount of money to be given in coins, given as an INTEGER, in cents.
    # e.g. $1.35 is input as 135
    # denoms = denominations of coins available, in INTEGER cents,
    # given as a ROW VECTOR.
    # Output:
    # numCoins = optimal number of coins used to find x
    # Aiden Burgess - abur970

    # Initialise initial coins for change to inf, except 0, which is the base case
    minCoinsNeeded = [float('inf') for i in range(x+1)]
    minCoinsNeeded[0] = 0

    # For each change value, iteratively calculate the minimum change required.
    for i in range(x):
        for coin in denoms:
            total = i+coin
            if total <= x:
                minCoinsNeeded[total] = min(
                    minCoinsNeeded[total], minCoinsNeeded[i]+1)

    return minCoinsNeeded[x]
