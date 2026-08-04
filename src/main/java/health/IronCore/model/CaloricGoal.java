package health.IronCore.model;

public enum CaloricGoal {
    MAINTAIN(0),
    GAIN_MUSCLE(-500),
    LOSE_WEIGHT(300);

    private final int caloricAdjustment;

    CaloricGoal(int caloricAdjustment) {
        this.caloricAdjustment = caloricAdjustment;
    }

    public int getCalorieAdjustment(){
        return caloricAdjustment;
    }


}
