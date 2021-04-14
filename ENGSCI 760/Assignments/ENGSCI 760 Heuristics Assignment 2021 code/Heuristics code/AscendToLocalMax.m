function [SolutionValue, bestSolution, solutionsOverTime] = AscendToLocalMax(x, NoPots, PotAl, PotFe, PotsPerCrucible, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue)
%numSolutions = 1;
solutionsOverTime = [];
maxSpread = 11;
while true
    SolutionValue = CalcSolutionValue(x, PotAl , PotFe, PotsPerCrucible, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);
    bestSolution = x;
    for i=1:NoPots;
        for j=i+1:NoPots;
            y = x;
            iCrucible = fix(i/PotsPerCrucible-1) + 1;
            iIndex = rem(i, PotsPerCrucible) + 1;
            jCrucible = fix(j/PotsPerCrucible-1) + 1;
            jIndex = rem(j, PotsPerCrucible) + 1;
            
            y(jCrucible,jIndex) = x(iCrucible, iIndex);
            y(iCrucible, iIndex) = x(jCrucible, jIndex);
            
            iOld = CalcCrucibleValueForIndex(x, maxSpread, iCrucible, PotAl , PotFe, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);
            iNew = CalcCrucibleValueForIndex(y, maxSpread, iCrucible, PotAl , PotFe, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);
            
            jOld = CalcCrucibleValueForIndex(x, maxSpread, jCrucible, PotAl , PotFe, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);
            jNew = CalcCrucibleValueForIndex(y, maxSpread, jCrucible, PotAl , PotFe, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);
            
            increaseInValue = iNew + jNew - iOld - jOld;
            if increaseInValue >= 0
                x = y;
            end
            %solutionsOverTime(numSolutions) = SolutionValue + increaseInValue;
            %numSolutions = numSolutions + 1;
        end
    end
    newPrice = CalcSolutionValue(x, PotAl , PotFe, PotsPerCrucible, NoCrucibles, NoQualities, QualityMinAl, QualityMaxFe, QualityValue);
    if newPrice > SolutionValue
        SolutionValue = newPrice;
        bestSolution = x;
    else
        break
    end
end
end
