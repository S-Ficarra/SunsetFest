import { IsString, IsEmail, MinLength, Matches, IsIn } from "class-validator";

export class UserDto {
    @IsString()
    name: string;
  
    @IsString()
    firstName: string;
  
    @IsEmail({}, { message: 'L\'adresse email n\'est pas valide.' })
    email: string;
  
    @IsString()
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
    @Matches(/(?=.*[a-z])/, { message: 'Le mot de passe doit contenir au moins une lettre minuscule.' })
    @Matches(/(?=.*[A-Z])/, { message: 'Le mot de passe doit contenir au moins une lettre majuscule.' })
    @Matches(/(?=.*\d)/, { message: 'Le mot de passe doit contenir au moins un chiffre.' })
    @Matches(/(?=.*[@$!%*?&])/, { message: 'Le mot de passe doit contenir au moins un caractère spécial.' })
    password: string;
  
    @IsIn(["1", "2", "3"])
    role: number;
};