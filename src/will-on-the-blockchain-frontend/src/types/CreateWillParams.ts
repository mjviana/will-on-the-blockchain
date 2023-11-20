export default interface CreateWillParams {
  authorName: string;
  will: string;
  testatorCitizenshipCardId: string;
  testatorBirthdate: number;
  isPublic: boolean;
  firstWitnessName: string;
  firstWitnessCitizenshipCardId: string;
  firstWitnessBirthdate: number;
  secondWitnessName: string;
  secondWitnessCitizenshipCardId: string;
  secondWitnessBirthdate: number;
}
