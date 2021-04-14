function CrucibleValue = CalcCrucibleValueForIndex(x, maxSpread, crucible, PotAl , PotFe, NoQualities, QualityMinAl, QualityMaxFe, QualityValue)
CrucibleAl = FastMean(PotAl(x(crucible,:)));
CrucibleFe = FastMean(PotFe(x(crucible,:)));
CrucibleValue= CalcCrucibleValue(CrucibleAl,CrucibleFe,NoQualities,QualityMinAl,QualityMaxFe,QualityValue);
spread = max(x(crucible,:)) - min(x(crucible,:));
if spread >= maxSpread
    CrucibleValue = CrucibleValue * (maxSpread / spread);
end
end