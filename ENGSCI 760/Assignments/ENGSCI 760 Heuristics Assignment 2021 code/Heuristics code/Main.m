function main()
% This is where it all happens

% Initialise the data
  [NoCrucibles,NoPots,PotsPerCrucible,NoQualities, ...
          QualityMinAl, QualityMaxFe, QualityValue] = InitQual;
  [PotAl, PotFe] = InitProb;

% Generate a starting solution
  x = GenStart(NoPots, NoCrucibles, PotsPerCrucible);

% Do the local search here...

% View the solution (double checking its objective function)
  ViewSoln(x, PotAl, PotFe, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);

end
