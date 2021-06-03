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
V(x) = \min{V(x+d)}
$$



#### ii.

Natural ordering: start from 0 change, then iteratively calculate until we reach x change. This is a bottom up solution as opposed to recursive solution.

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

The value function for this problem represents the amount of satisfaction that the student can gain from drinking x beers after exam n.

### c)

$$
V_n(x) = \max(V_{n+1}(x), V_{n+1}(x-1), V_{n+1}(x-2))
$$

$$
if x
$$



### d)

The maximum amount of satisfaction that the student can gain is 84.

![image-20210603115824573](C:\Users\aiden\AppData\Roaming\Typora\typora-user-images\image-20210603115824573.png)

### e)

The optimal policy for consuming the five beverages is: 2 after exam 1, 2 after exam 2, and 1 after exam 3

35+37+12 = 84

## 3.

### a)

$$
V_N=\int_{0}^{3}{r.\frac{6-2r}{9}}dr
$$

$$
V_N=\left[\frac{3r^2}{9} - \frac{2r^3}{27}\right]_0^3
$$

$$
V_N=3-2 = 1
$$



### b)

If the current candidates reward R is greater than the reward we expect from rejecting the candidate and continuing the interview process, then we accept the candidate. Otherwise we reject the candidate. i.e. $V_{N-1} = \max(R, V_{N})$

### c)

The expected value for $V_{N-1}$ is dependent on what we expect from $V_N$. If our candidate achieves a higher reward than what we expect if we reject them ($V_N$) then we accept them. This represents the lower bound of the first integral. Otherwise, we have a probability determined from 1-0 f(r) to receive $V_N$.
$$
V_{N-1} = \int^3_{V_N}{r.\frac{6-2r}{9}}dr + \int^{V_N}_0{V_N.\frac{6-2r}{9}}dr
$$

$$
V_{N-1} = \int^3_{1}{r.\frac{6-2r}{9}}dr + \int^{1}_0{1.\frac{6-2r}{9}}dr
$$

$$
V_{N-1} = \left[\frac{3r^2}{9} - \frac{2r^3}{27}\right]_1^3 + \left[\frac{6r}{9} - \frac{r^2}{9}\right]_0^1
$$

$$
V_{N-1} = \frac{20}{27} + \frac{5}{9} = \frac{35}{27}
$$

### d)

We extend the specific behaviour from $V_{N-1}$ to be more general for all $n$
$$
V_{n} = \int^3_{V_{n+1}}{r.\frac{6-2r}{9}}dr + \int^{V_{n+1}}_0{V_{n+1}.\frac{6-2r}{9}}dr
$$

$$
V_{n} = \int^3_{V_{n+1}}{r.\frac{6-2r}{9}}dr + \int^{V_{n+1}}_0{V_{n+1}.\frac{6-2r}{9}}dr
$$

$$
V_n = \left[\frac{3r^2}{9} - \frac{2r^3}{27}\right]_{V_{n+1}}^3 + \left[\frac{6r}{9} - \frac{r^2}{9}\right]_0^{V_{n+1}}
$$

$$
V_n = \left[\frac{3r^2}{9} - \frac{2r^3}{27}\right]_{V_{n+1}}^3 + \left[\frac{6.V_{n+1}.r}{9} - \frac{V_{n+1}.r^2}{9}\right]_0^{V_{n+1}}
$$

$$
V_n = \left[\frac{3r^2}{9} - \frac{2r^3}{27}\right]_{V_{n+1}}^3 + \left[\frac{6.V_{n+1}.r}{9} - \frac{V_{n+1}.r^2}{9}\right]_0^{V_{n+1}}
$$

$$
V_n=\left(1-\frac{V_{n+1}^2}{3}+\frac{2V_{n+1}^3}{27}\right) + \left(\frac{2V_{n+1}^2}{3}-\frac{V_{n+1}^3}{9}\right)
$$

$$
V_n = 1 + \frac{V_{n+1}^2}{3} - \frac{V_{n+1}^3}{27}
$$
