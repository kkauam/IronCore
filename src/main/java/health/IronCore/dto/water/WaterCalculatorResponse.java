package health.IronCore.dto.water;

public record WaterCalculatorResponse(
        double weightKg,
        String activityLevel,
        double dailyWaterMl,
        double dailyWaterLiters,
        int glassesOf250ml
) {}
