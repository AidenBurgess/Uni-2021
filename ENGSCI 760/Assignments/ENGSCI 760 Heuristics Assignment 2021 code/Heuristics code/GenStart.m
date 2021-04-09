function x = GenStart(NoPots, NoCrucibles, PotsPerCrucible)
% Generate a (boring) starting solution
  Pot = 1;
  for c=1:NoCrucibles;
    for i = 1:PotsPerCrucible;
      x(c,i) = Pot;
      Pot = Pot + 1;
    end
  end
end
