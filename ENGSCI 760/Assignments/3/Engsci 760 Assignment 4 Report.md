## Engsci 760 Assignment 4 Report

### Aiden Burgess - abur970 - 600280511

## 1. Coin Counting

### a.

Stages: Amount of change left

States: Coins that are being used 

Actions: Add a coin of a remaining denomination

Costs: 

1 if we add the coin

0 if we don't add the coin

### b.

[dynamic_programming_handout.pdf (ryan-moreno.github.io)](https://ryan-moreno.github.io/resources/dynamic_programming_handout.pdf)

![image-20210602114112574](C:\Users\aiden\AppData\Roaming\Typora\typora-user-images\image-20210602114112574.png)
$$
V_N(x) =
$$

### c.

### d.

Optimal substructure: We combine the solutions found from lower amounts of change to produce the solution of a higher change amount.

Overlapping subproblems: Solutions to subproblems are reused repeatedly, as combinations of different coins may lead to the same change remaining, which is the same subproblem. The image below is a simple illustration of such reuse.

<img src="C:\Users\aiden\Downloads\20210602_212718 (1).jpg" alt="20210602_212718 (1)" style="zoom:10%;" />

### e.

#### i.

$$
V(x) = 
$$



#### ii.

Natural ordering 

### f.

Code is also submitted via canvas.

```python
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
```



## 2. Exam Beverages

### a)

Stages

States

Actions



### b)

The value function for this problem represents

### c)

$$
V_n(x) = 
$$

### d)

Or just use excel lol

Code:

Output:

### e)

The optimal policy for consuming the five beverages is:

## 3.

### a)

$$
V_N=
$$

### b)

The optimal decision is

### c)

### d)

