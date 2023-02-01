export interface GeneratePswStateDto {
  msk: string;
  host: string;
  usernameEmail: string;
  date: string;
  retries: string;
}

export interface GeneratePswFormPropsDto {
  generatedPasswordHash: string;
  generatePswState: GeneratePswStateDto;
}
