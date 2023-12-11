import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { LoginUpDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //signup function
  async signUp(signUpDto: SignUpDto): Promise<{ token: string; user: object }> {
    const { email, name, password } = signUpDto;
    try {
      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        throw new ConflictException('Email is already registered');
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);
      const newUser = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      const token = this.jwtService.sign({
        email: newUser.email,
        _id: newUser._id,
        name: newUser.name,
      });
      const decodedToken = this.jwtService.verify(token);
      console.log(decodedToken);

      return {
        token,
        user: {
          email: newUser.email,
          _id: newUser._id,
          name: newUser.name,
        },
      };
    } catch (error) {
      throw new ConflictException('Email is already registered');
    }
  }

  //for login
  async login(loginDto: LoginUpDto): Promise<{ token: string; user: object }> {
    const { email, password } = loginDto;
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isPasswordValid = await bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const token = this.jwtService.sign({
        email: user.email,
        _id: user._id,
        name: user.name,
      });

      return {
        token,
        user: {
          email: user.email,
          _id: user._id,
          name: user.name,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Login failed');
    }
  }
}
