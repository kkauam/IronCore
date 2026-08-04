package health.IronCore.dto.protein;

public record ProteinCalculatorResponse(
        double weightKg,
        String fitnessGoal,
        double dailyProteinGrams,
        int mealsToDistribute
) {}

