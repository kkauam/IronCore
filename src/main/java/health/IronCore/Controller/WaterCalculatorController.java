package health.IronCore.Controller;
import health.IronCore.dto.water.WaterCalculatorRequest;
import health.IronCore.dto.water.WaterCalculatorResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import health.IronCore.service.WaterCalculatorService;

@RestController
@RequestMapping("/api/calculators")
@CrossOrigin(origins = "*")
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
