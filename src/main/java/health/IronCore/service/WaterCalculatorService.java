package health.IronCore.service;

import health.IronCore.dto.water.WaterCalculatorRequest;
import health.IronCore.dto.water.WaterCalculatorResponse;
import org.springframework.stereotype.Service;

@Service
public class WaterCalculatorService {

    private static final double BASE_WATER_IN_LITERS = 35.0;

    public WaterCalculatorResponse calculate(WaterCalculatorRequest request){

        //1. calculo base 35ml por kg
        double baseWaterMl = request.weightKg() * BASE_WATER_IN_LITERS;

        //2. multiplicar pelo nível de atividade
        double dailyWaterMl = baseWaterMl * request.activityLevel().getMultiplier();

        //3. converter para litros
        double dailyWaterLiters = dailyWaterMl / 1000.0;
        int glasses = (int) Math.round(dailyWaterMl / 250.0);

        //4. criar resposta
        return new WaterCalculatorResponse(
                request.weightKg(),
                request.activityLevel().name(),
                Math.round(dailyWaterMl),
                Math.round(dailyWaterLiters * 10.0) / 10.0,
                glasses);

    }



}
