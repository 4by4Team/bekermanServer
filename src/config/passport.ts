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
            console.log('Client ID:', process.env.GOOGLE_CLIENT_ID);
            try {
                // Check if user exists
                let user = await prisma.user.findUnique({
                    where: { email: profile.emails?.[0].value }
                });

                if (!user) {
                    // Create new user if doesn't exist
                    user = await prisma.user.create({
                        data: {
                            email: profile.emails?.[0].value!,
                            firstName: profile.name?.givenName || '',
                            lastName: profile.name?.familyName || '',
                            password: '', // Empty password for Google auth users
                            role: Role.USER,
                            phone: '',
                            tz: '',
                        }
                    });
                }
console.log("------",process.env.GOOGLE_CLIENT_ID);

                return done(null, user);
            } catch (error) {
console.log("---*******---",process.env.GOOGLE_CLIENT_ID);

                return done(error as Error);
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
    } catch (error) {
        done(error);
    }
});

export default passport;
