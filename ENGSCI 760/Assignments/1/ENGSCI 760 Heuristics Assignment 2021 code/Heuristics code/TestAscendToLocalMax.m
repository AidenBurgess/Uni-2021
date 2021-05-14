function [] = TestAscendToLocalMax(PotAl, PotFe, NoCrucibles,NoPots,PotsPerCrucible,NoQualities, QualityMinAl, QualityMaxFe, QualityValue)
x = GenStart(NoPots, NoCrucibles, PotsPerCrucible);
% Do the local search here...
[SolutionValue, solution, solutionsOverTime] = AscendToLocalMax(x, NoPots, PotAl, PotFe, PotsPerCrucible, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);
plot(solutionsOverTime);

disp('--------------------------')
% View the solution (double checking its objective function)
ViewSoln(solution, PotAl, PotFe, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);
end

