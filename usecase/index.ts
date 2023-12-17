import FeeAssessmentUsecase from "./feeAssesment";

class Usecase {
    feeAssesment: FeeAssessmentUsecase

    constructor(feeAsses: FeeAssessmentUsecase) {
        this.feeAssesment = feeAsses
    }
}

export default Usecase