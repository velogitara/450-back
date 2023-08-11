import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  patronymic_name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  building: string;

  @ApiProperty()
  apartment: string;

  @ApiProperty()
  birthCertificate: string;

  @ApiProperty()
  regionFrom: string;

  @ApiProperty()
  settlementFrom: string;

  @ApiProperty()
  memberNumber: number;

  @ApiProperty()
  phone: string;
}
