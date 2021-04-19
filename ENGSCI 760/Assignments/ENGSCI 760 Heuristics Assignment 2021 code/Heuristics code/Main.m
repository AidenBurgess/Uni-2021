function main()
% This is where it all happens

% Initialise the data
  [NoCrucibles,NoPots,PotsPerCrucible,NoQualities, ...
          QualityMinAl, QualityMaxFe, QualityValue] = InitQual;
  [PotAl, PotFe] = InitProb;
  
  %TestAscendToLocalMax(PotAl, PotFe, NoCrucibles,NoPots,PotsPerCrucible,NoQualities, QualityMinAl, QualityMaxFe, QualityValue)
  DoRepeatedAscents(200, NoPots, PotAl, PotFe, PotsPerCrucible, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);

end
