package health.IronCore.Controller;
import health.IronCore.dto.water.WaterCalculatorRequest;
import health.IronCore.dto.water.WaterCalculatorResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import health.IronCore.service.WaterCalculatorService;

@RestController
@RequestMapping("/api/calculators")
public class WaterCalculatorController {

    private final WaterCalculatorService service;

    public WaterCalculatorController(WaterCalculatorService service) {
        this.service = service;
    }

    @PostMapping("/water")
    public ResponseEntity<WaterCalculatorResponse> calculateWater(
            @Valid @RequestBody WaterCalculatorRequest request) {

        WaterCalculatorResponse response = service.calculate(request);
        return ResponseEntity.ok(response);
    }
}
