function [SolutionValue, CrucibleValue] = CalcSolutionValue(x, PotAl , PotFe, PotsPerCrucible, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue) 
  for c = 1:NoCrucibles
    CrucibleAl = mean(PotAl(x(c,:)));
    CrucibleFe = mean(PotFe(x(c,:)));
    CrucibleValue(c)= CalcCrucibleValue(CrucibleAl,CrucibleFe,NoQualities,QualityMinAl,QualityMaxFe,QualityValue);
  end
  
  SolutionValue = sum(CrucibleValue);

end