function Value = CalcCrucibleValue(CrucibleAl, CrucibleFe, NoQualities, QualityMinAl, QualityMaxFe, QualityValue)
% Lookup the value of a product that has the given Al and Fe percents
% Uses a tolerance of 0.00001 to avoid rounding errors
% Find the last quality range (assuming they are sorted worst to best) that we fit into
  Value = 0;
  for i = NoQualities:-1:1
    if CrucibleAl>=QualityMinAl(i)-0.00001 
      if CrucibleFe <= QualityMaxFe(i)+0.00001
         Value = QualityValue(i);
         break;
      end 
    end 
  end
end
