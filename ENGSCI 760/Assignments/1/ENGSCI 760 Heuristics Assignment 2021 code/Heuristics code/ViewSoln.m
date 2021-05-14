function totalValue = ViewSoln(x, PotAl, PotFe, NoCrucibles, ...
                  NoQualities, QualityMinAl, QualityMaxFe, QualityValue)
% Print current solution in x to the screen. 
% The solution objective & spread is calculated from scratch and printed.	
  maxSpread = 0;
  for c = 1:NoCrucibles
    spread = max(x(c,:)) - min(x(c,:));
    maxSpread = max(maxSpread,spread);
    CrucibleAl = mean(PotAl(x(c,:)));
    CrucibleFe = mean(PotFe(x(c,:)));
    CrucibleValue(c)= CalcCrucibleValue(CrucibleAl,CrucibleFe,NoQualities,QualityMinAl,QualityMaxFe,QualityValue);
    fprintf('%2d [%3d %3d %3d] %5.2fAl  %4.2fFe %6.2f %2d\n',c, x(c,:),...
	        CrucibleAl , CrucibleFe, CrucibleValue(c), spread);
  end
  fprintf('                        Sum,Max= %6.2f,%2d\n',sum(CrucibleValue), maxSpread)
  totalValue = sum(CrucibleValue);
end
