import { TLocales } from "./ILocalization";

export const translations: { [keys in TLocales]: { [key: string]: string; } } = {
    en: {
        appName: 'jungle',
        onboarding_0_title: 'Let’s create a space for your workflows',
        onboarding_0_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        onboarding_1_title: 'Manage everything on your phone',
        onboarding_1_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        onboarding_2_title: 'Work anywhere easily',
        onboarding_2_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        next: 'Next',
        back: 'Back',
        getStarted: 'Get started',
        welcomeToPet: 'Welcome to Pet',
        continueWithGoogle: 'Continue with Google',
        continueWithApple: 'Continue with Apple',
        continueWithEmail: 'Continue with Email',
        continue: 'Continue',
        or: 'or',
        wrongEmailFormat: 'Wrong email format',
        logIn: 'Log in',
        signUp: 'Sign up',
        noAccount: 'Don’t you have an account?',
        haveAccount: 'Have an account?',
        verification: 'Verification',
        resetCode: 'Resend after {{second}} seconds',
        resend: 'Resend',
    }
};