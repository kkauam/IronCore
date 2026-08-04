package health.IronCore.model;

public enum FitnessGoal {

    SEDENTARY(0.8),
    MASS_GAIN(1.8),
    FAT_LOSS(2.0),
    ATHLETE(2.2);


    private final double multiplier;

    FitnessGoal(double multiplier) {
        this.multiplier = multiplier;
    }

    public double getMultiplier() {
        return multiplier;
    }
}
