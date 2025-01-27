/* eslint-disable max-len */

import type { ApiLangPack } from '../api/types';

/**
 * TL - Add some language constants support.
 */
export const fallbackLangPackInitial = {
  WrongNumber: 'Wrong number?',
  SentAppCode1: 'We have sent you a message in ',
  SentAppCode2: 'Telegram with the verfication code.',
  VerifyAppCode: '5 digits verification code',
  EnterCode: 'Enter verification code',
  'Login.JustSentSms': 'We have sent you a code via SMS. Please enter it above.',
  'Login.Header.Password': 'Enter Password',
  'Login.EnterPasswordDescription': 'You have Two-Step Verification enabled, so your account is protected with an additional password.',
  StartText1: 'Please enter your phone number ',
  StartText2: 'associated with your telegram account.',
  'Login.PhonePlaceholder': 'Your phone number',
  'Login.Next': 'Next',
  'Login.QR.Login': 'Log in by QR Code',
  'Login.QR.Title': 'Log in to Telegram by QR Code',
  'Login.QR.Help1': 'Open Telegram on your phone',
  'Login.QR.Help2': 'Go to **Settings** > **Devices** > **Link Desktop Device**',
  'Login.QR2.Help2': 'Go to **Settings** → **Devices** → **Link Desktop Device**',
  'Login.QR.Help3': 'Point your phone at this screen to confirm login',
  'Login.QR.Cancel': 'Log in by phone Number',
  YourName: 'Your Name',
  'Login.Register.Desc': 'Enter your name and add a profile picture.',
  'Login.Register.FirstName.Placeholder': 'First Name',
  'Login.Register.LastName.Placeholder': 'Last Name',
  'Login.SelectCountry.Title': 'Country',
  lng_country_none: 'Country not found',
  PleaseEnterPassword: 'Enter your new password',
  PHONE_NUMBER_INVALID: 'Invalid phone number',
  PHONE_CODE_INVALID: 'Invalid code',
  PASSWORD_HASH_INVALID: 'Incorrect password',
  PHONE_PASSWORD_FLOOD: 'Limit exceeded. Please try again later.',
  PHONE_NUMBER_BANNED: 'This phone number is banned.',
} as ApiLangPack;
