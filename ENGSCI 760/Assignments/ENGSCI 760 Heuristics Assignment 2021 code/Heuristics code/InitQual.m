function [NoCrucibles,NoPots,PotsPerCrucible,NoQualities, ...
          QualityMinAl, QualityMaxFe, QualityValue] = Init()
% Init all the main constants with the Comalco specific data
  NoCrucibles = 17;
  NoPots = 51;
  PotsPerCrucible = 3;
  
  NoQualities = 11;
  
  QualityMinAl = [95.00, 99.10, 99.10, 99.20, 99.25, 99.35, 99.50, 99.65, 99.75, 99.85, 99.90];
  QualityMaxFe = [ 5.00,  0.81,  0.79,  0.79,  0.76,  0.72,  0.53,  0.50,  0.46,  0.33,  0.30];
  QualityValue = [   10, 21.25, 26.95, 36.25, 41.53, 44.53, 48.71, 52.44, 57.35, 68.21, 72.56];

end
