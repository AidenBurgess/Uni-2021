function main()
% This is where it all happens

% Initialise the data
  [NoCrucibles,NoPots,PotsPerCrucible,NoQualities, ...
          QualityMinAl, QualityMaxFe, QualityValue] = InitQual;
  [PotAl, PotFe] = InitProb;
  
  DoRepeatedAscents(2000, NoPots, PotAl, PotFe, PotsPerCrucible, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);

end
