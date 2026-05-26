package health.IronCore.service;

import health.IronCore.dto.protein.ProteinCalculatorRequest;
import health.IronCore.dto.protein.ProteinCalculatorResponse;
import org.springframework.stereotype.Service;

@Service
public class ProteinCalculatorService {

    public ProteinCalculatorResponse calculate(ProteinCalculatorRequest request) {

        double dailyProteinGrams = request.weightKg() * request.fitnessGoal().getMultiplier();
        int mealsToDistribute = 5; // Exemplo: distribuir em 5 refeições

        return new ProteinCalculatorResponse(
                request.weightKg(),
                request.fitnessGoal().name(),
                dailyProteinGrams,
                mealsToDistribute
        );
    }
}
