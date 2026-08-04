package health.IronCore.service;

import health.IronCore.dto.energy.EnergyCalculatorRequest;
import health.IronCore.dto.energy.EnergyCalculatorResponse;
import health.IronCore.model.Gender;
import org.springframework.stereotype.Service;

@Service
public class EnergyCalculatorService {

    public EnergyCalculatorResponse calculate(EnergyCalculatorRequest request) {

        double tmb_male = (10 * request.weightKg()) + (6.25 * request.heightCm()) - (5 * request.age()) + 5;
        double tmb_female = (10 * request.weightKg()) + (6.25 * request.heightCm()) - (5 * request.age()) - 161;

        double bmr;
        if  (request.gender() == Gender.MALE) {
            bmr = tmb_male;
        }
        else {
            bmr = tmb_female;
        }
        double tdee = bmr * request.activityLevel().getMultiplier();
        double targetCalories = tdee + request.caloricGoal().getCalorieAdjustment();

        return new EnergyCalculatorResponse(
                request.weightKg(),
                request.heightCm(),
                request.age(),
                request.gender().name(),
                bmr,
                tdee,
                request.caloricGoal().name(),
                targetCalories
        );
    }

}
