function x = GenRandom(NoPots, NoCrucibles, PotsPerCrucible)
  solution = randperm(NoPots);
  x = reshape(solution,[NoCrucibles,PotsPerCrucible]);
end
