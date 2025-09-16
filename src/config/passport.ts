import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../../prisma/client';
import { Role } from '../models/enums';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Google profile:', profile);
      try {
        let user = await prisma.user.findUnique({
          where: { email: profile.emails?.[0].value },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails?.[0].value!,
              firstName: profile.name?.givenName || '',
              lastName: profile.name?.familyName || '',
              password: '',
              role: Role.USER,
              phone: '000000000',
              tz: '123456789',
            },
          });
        }

        done(null, user);
      } catch (err) {
        done(err as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
