package health.IronCore;

import health.IronCore.dto.water.WaterCalculatorRequest;
import health.IronCore.model.ActivityLevel;
import org.junit.jupiter.api.Test;
import health.IronCore.service.WaterCalculatorService;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class WaterCalculatorServiceTest {

    private final WaterCalculatorService service = new WaterCalculatorService();

    @Test
    void shouldCalculateCorrectlyForAthlete() {
        var request = new WaterCalculatorRequest(70.0, ActivityLevel.SEDENTARY);
        var response = service.calculate(request);

        //70kg × 35ml × 1.0 = 2450ml = 2.5L = 10 copos
        assertEquals(2450, response.dailyWaterMl());
        assertEquals(2.5, response.dailyWaterLiters());
        assertEquals(10, response.glassesOf250ml());
    }

    @Test
    void shouldApplyActivityMultiplier() {
        var request = new WaterCalculatorRequest(70.0, ActivityLevel.MODERATE);
        var response = service.calculate(request);

        //70kg × 35ml × 1.4 = 3430ml = 3.4L = 14 copos
        assertEquals(2940, response.dailyWaterMl());
    }

}
