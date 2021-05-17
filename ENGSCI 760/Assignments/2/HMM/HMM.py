def constructEmissions(pr_correct, adj):
    # This function takes in a matrix detailing the adjacent letters on a keyboard, and the
    #  probability of hitting the correct key and outputs a matrix of emission probabilities
    #
    # INPUT
    # pr_correct - the probability of correctly hitting the intended key;
    # adj - a 26 x 26 matrix with adj[i][j] = 1 if the i'th letter in the alphabet is adjacent
    # to the j'th letter.
    #
    # OUTPUT
    # b - a 26 x 26 matrix with b[i][j] being the probability of hitting key j if you intended
    # to hit key i (the probabilities of hitting all adjacent keys are identical).

    b = [[0 for i in range(26)] for j in range(26)]
    for i, row in enumerate(adj):
        num_keys = sum(row)
        prob_rest = pr_correct/(num_keys)
        for j, letter in enumerate(row):
            if i == j:
                b[i][j] = pr_correct
            if letter == 1:
                b[i][j] = prob_rest
    return b


def constructTransitions(filename):
    # This function constructs tranisition matricies for lowercase characters.
    # It is assumed that the file 'filename' only contains lowercase characters
    # and whitespace.
    # INPUT
    #  filename is the file containing the text from which we wish to develop a
    #  Markov process.
    #
    # OUTPUT
    #  p is a 26 x 26 matrix containing the probabilities of transition from a
    #  state to another state, based on the frequencies observed in the text.
    #  prior is a vector of prior probabilities based on how often each character
    #  appears in the text

    # Read the file into a sting called text
    with open(filename, 'r') as myfile:
        text = myfile.read()
        import re
        # Your code goes here.
        counts = [[0 for i in range(26)] for j in range(26)]
        for word in text.split():
            word = re.sub(r'\W+', '', word)
            prev = ord(word[0]) - 97
            for letter in word[1:]:
                letter = ord(letter) - 97
                counts[prev][letter] += 1
                prev = letter

    total_per_char = [sum(count) for count in counts]

    p = [[0 for i in range(26)] for j in range(26)]
    for starting_letter, row in enumerate(counts):
        total_per_row = sum(row)
        for ending_letter, count_for_letter in enumerate(row):
            p[starting_letter][ending_letter] = count_for_letter/total_per_row

    # Calculate priors
    from collections import Counter
    letter_counts = Counter(text)
    total_chars = sum(letter_counts[chr(i+97)] for i in range(26))
    prior = [letter_counts[chr(i+97)]/total_chars for i in range(26)]

    return (p, prior)


def HMM(p, pi, b, y):
    # This function implements the Viterbi algorithm, to find the most likely
    # sequence of states given some set of observations.
    #
    # INPUT
    #  p is a matrix of transition probabilies for states x;
    #  pi is a vector of prior distributions for states x;
    #  b is a matrix of emission probabilities;
    #  y is a vector of observations.
    #
    # OUTPUT
    # x is the most likely sequence of states, given the inputs.

    n = len(y)
    m = len(pi)

    gamma = {}
    phi = {}

    # You must complete the code below
    for i in range(26):
        # Your code goes here (initialisation)
        y_1 = int(y[0])
        b_k = b[i][y_1]
        pi_k = pi[i]
        gamma_k = b_k * pi_k
        gamma[i, 0] = gamma_k

    for t in range(1, n):
        for k in range(26):
            gamma[k, t] = 0

            for j in range(26):
                # Your code goes here
                y_t = y[t]
                b_k = b[k][y_t]
                p_jk = p[j][k]
                gamma_j = gamma[j, t-1]
                new_prob = b_k*p_jk*gamma_j
                if new_prob > gamma[k, t]:
                    gamma[k, t] = new_prob
                    phi[k, t] = j

    best = 0
    x = []
    for t in range(n):
        x.append(0)

    # Find the final state in the most likely sequence x(n).
    for k in range(26):
        if best <= gamma[k, n-1]:
            best = gamma[k, n-1]
            x[n-1] = k

    for i in range(n-2, -1, -1):
        # Your code goes here
        x[i] = (phi[x[i+1], i+1])
        pass
    return x


def probabilityOfCorrectKey(adj):
    # Assume 50% chance hitting intended key, and even distribution for the rest
    pr_correct = [row[:] for row in adj]
    for i, row in enumerate(pr_correct):
        num_keys = sum(row)
        prob_rest = 0.5/(num_keys)
        for j, letter in enumerate(row):
            if i == j:
                pr_correct[i][j] = 0.5
            if letter == 1:
                pr_correct[i][j] = prob_rest
    return pr_correct


def main():
    # The text messages you have received.
    msgs = []
    # msgs.append('cljlx')
    msgs.append(
        'cljlx ypi ktxwf a pwfi psti vgicien aabdwucg vpd me and vtiex voe zoicw')
    # could you
    msgs.append('qe qzby yii tl gp tp yhr cpozwdt fwstqurzby')
    # we want you to go to our
    msgs.append('qee ypi xfjvkjv ygetw ib ulur vae')
    # see you
    msgs.append('wgrrr zrw uiu')
    msgs.append('hpq fzr qee ypi vrpm grfw')
    # how far are you from
    msgs.append('qe zfr xtztvkmh')
    # we are
    msgs.append('wgzf tjmr will uiu xjoq jp ywfw')

    # The probability of hitting the intended key.
    pr_correct = 0.5

    # An adjacency matrix, adj(i,j) set to 1 if the i'th letter in the alphabet is next
    # to the j'th letter in the alphabet on the keyboard.
    adj = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0], [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [
        0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]]

    # Call a function to construct the emission probabilities of hitting a key
    # given you tried to hit a (potentially) different key.
    b = constructEmissions(pr_correct, adj)

    # Call a function to construct transmission probabilities and a prior distribution
    # from the King James Bible.
    [p, prior] = constructTransitions('bible.txt')

    # Run the Viterbi algorithm on each word of the messages to determine the
    # most likely sequence of characters.
    for msg in msgs:
        s_in = msg.split(' ')  # divide each message into a list of words

        decoded_message = ''

        for i in range(len(s_in)):
            y = []

            for j in range(len(s_in[i])):
                # convert the letters to numbers 0-25
                y.append(ord(s_in[i][j])-97)

            x = HMM(p, prior, b, y)  # perform the Viterbi algorithm

            output = ''
            for j in range(len(x)):
                # convert the states x back to letters
                output = output+chr(x[j]+97)

            if i != len(s_in):
                decoded_message += output+' '  # recreate the message

        print(msg)  # display received message
        print(decoded_message)  # display decoded message
        print('')


if __name__ == "__main__":
    main()
