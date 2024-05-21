export default interface CreateWillParams {
  authorName: string;
  will: string;
  testatorCitizenshipCardId: string;
  isPublic: boolean;
  firstWitnessName: string;
  firstWitnessCitizenshipCardId: string;
  secondWitnessName: string;
  secondWitnessCitizenshipCardId: string;
  secretCode: string;
  createdAt: number;
}
