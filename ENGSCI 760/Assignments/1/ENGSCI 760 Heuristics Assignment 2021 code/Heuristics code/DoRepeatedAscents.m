function [] = DoRepeatedAscents(n, NoPots, PotAl, PotFe, PotsPerCrucible, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue)
solutionValues = [];
bestSolutionValues = [];
bestSolutionValue = 0;
bestSolution = [];
for ascent=1:n
    x = GenRandom(NoPots, NoCrucibles, PotsPerCrucible);
    
    [SolutionValue, solution, ~] = AscendToLocalMax(x, NoPots, PotAl, PotFe, PotsPerCrucible, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);
    if SolutionValue > bestSolutionValue
        bestSolutionValue = SolutionValue;
        bestSolution = solution;
    end
    solutionValues(ascent) = SolutionValue;
    bestSolutionValues(ascent) = bestSolutionValue;
end

plot(solutionValues)
hold on
plot(bestSolutionValues)
hold off
ViewSoln(bestSolution, PotAl, PotFe, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);
end

