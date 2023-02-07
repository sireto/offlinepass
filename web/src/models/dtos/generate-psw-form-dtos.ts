export interface GeneratePswStateDto {
  msk: string;
  host: string;
  usernameEmail: string;
  date: string;
  retries: number;
}

export interface GeneratePswFormPropsDto {
  generatedPasswordHash: string;
  generatePswState: GeneratePswStateDto;
}
