package health.IronCore.dto.energy;

public record EnergyCalculatorResponse(

        double weightKg,
        double heightCm,
        int age,
        String gender,

        double bmr,              // TMB — calorias em repouso
        double tdee,             // gasto total diário
        String caloricGoal,      // objetivo (MAINTAIN, LOSE_WEIGHT, GAIN_MUSCLE)
        double targetCalories    // meta calórica final = TDEE + ajuste

) {
}
