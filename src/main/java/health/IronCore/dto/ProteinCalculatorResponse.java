package health.IronCore.dto;

public record ProteinCalculatorResponse(
        double weightKg,
        String fitnessGoal,
        double dailyProteinGrams,
        int mealsToDistribute
) {}

