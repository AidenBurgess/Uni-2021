clear all

%%%%%%%%%%%%%%%%%%%%%%%% USER INPUT STARTS HERE %%%%%%%%%%%%%%%%%%%%%%%%%%%

% Number of nodes in the Bayesian network
N=3;

% Defining arcs which join pairs of nodes (nodes are indexed 1...N)
B(1,:)=[1,2];
B(2,:)=[2,3];

% Set up information struction
info=cell(N,1);

% Set up conditional distribution structure
f=cell(N,1);

% Specify any given information for each event (a vector of 1s means there is no information given for that event.
% If information is given for an event, place a 0 corresponding to any outcome that is impossible.
info(1)={[1,0]};
info(2)={[1,1]};
info(3)={[0,1]};

% Specify conditional distributions
f(1)={[0.2,0.8]};
f(2)={[0.8,0.2;0.3,0.7]};
f(3)={[0.6,0.4;0.2,0.8]};

% The order in which nodes will be scanned in the belief propagation (all children must occur before their parents)
% The last node-index should be the index of the root node (with no parents).
order=[3,2,1];

%%%%%%%%%%%%%%%%%%%%%%%%% USER INPUT ENDS HERE %%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Set up structures to store parent and child information for each node
parents=cell(N,1);
children=cell(N,1);

% Define A to be the number of arcs in the Bayesian network
A=size(B);
A=A(1);

% Go through arcs, and define parents and children
for i=1:A
    parents(B(i,2))={[parents{B(i,2)} B(i,1)]};
    children(B(i,1))={[children{B(i,1)} B(i,2)]};
end

% Set up structures for belief propagation algorithm
lambda=cell(N,1);
lambda_sent=cell(N,1);
pi=cell(N,1);
BEL=cell(N,1);
pi_received=cell(N,1);

% First pass, from the leaf nodes to the root node
for index=1:N
    i=order(index);
    if isempty(children{i}) % if the node is a leaf node, lambda simply is set to the information at the node
        lambda(i)=info(i);
    else % if the node is not a leaf node, lambda is the product of the information at the node, and the lambda sent from each of the children
        lambda(i)=info(i);
        child=children{i};
        for j=1:length(child)
            lambda(i)={lambda{i}.*lambda_sent{child(j)}};
        end
    end
    
    if ~isempty(parents{i}) % if the node is not the root node, send information to its parent node
        lambda_sent(i)={lambda{i}*transpose(f{i})}; 
    end
end

% Second pass, from the root node to the leaf nodes
for index=1:N
    i=order(N-index+1);
    if isempty(parents{i}) % if the node is the root node, pi is set to be the prior distribution at the node
        pi(i)=f(i);
    else % otherwise, pi is the matrix product of the message from the parent and the conditional probability at the node
        pi(i)={pi_received{i}*f{i}};
    end
    
	% compute a normalised belief vector
    BEL(i)={pi{i}.*lambda{i}};
    BEL(i)={BEL{i}/sum(BEL{i})};
    
	% send adjusted and normalised messages to each child
    child=children{i};
    for j=1:length(child)
        pi_received(child(j))={BEL{i}./lambda_sent{child(j)}}; 
        pi_received(child(j))={pi_received{child(j)}/sum(pi_received{child(j)})};
    end
end

% Display the updated distributions, given the information.
for i=1:N
	disp([num2str(i) ': ' num2str(BEL{i})]);
end