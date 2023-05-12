// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_BACKEND: 'http://204.48.18.206:3001/', //'https://backend.feriascotiabank.com.pe/', //
  // URL_BACKEND: 'https://b9c8-2800-200-e800-494d-c88d-a4b2-feb4-8d6f.ngrok.io/', //'https://backend.feriascotiabank.com.pe/', //
  lyraPublicKey:
    '26400434:testpublickey_Q6PhdlWHO2rkDxozDEVM3Dh8BT5Czl72dt0S0ksHv1JaE',
  lyraURL: 'https://api.lyra.com/',
  izipayURL: 'https://testws.punto-web.com/Puntos/PWPuntos.aspx',
  JWT_TOKEN:
    'ZXlKaGJHY2lPaUpTVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnJaWGtpT2lJNU56Z3dZVEk1TW1FMU9HVXlNMlJoWlRJME1qZzBOakUwTlRObFpqa3habUppTVROaU5qZG1OekV5WW1ZeFpXTTNabU00TURjMVl6STFNakJoTUdRM1pEVmxZVE0zT0RBMk1XTTFaR0l6WkRBM056YzFOalptWWpBMlpETXpZemNpTENKemVYTjBaVzFmWVhCcElqb2ljMk52ZEdsaFltRnVhMTltWlhKcFlTSXNJbWxoZENJNk1UWXdNREV3TnpVMU1IMC5DcTZqbFZsMWw1SE0tSW1VTXZDX2tFQklMZXRxMGlIRUxEdVhreW9IMHBqV0I3V09uZEY3TG5hc0hjVEJaV013LThXUjAxUVUwM2MtWUlEdjVjcHctdw==',
  browserPath: 'dist/FeriaScotiaPuntosFE/browser',
  PUBLIC_KEY_LOGIN: `-----BEGIN PUBLIC KEY-----
  MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGg1GzKs5vClPS/hT5v5hTaE9gtt
  AVkc+ryqHn6YjlSAXy0SYiioWfqfRglJvyFcNvdrZFbZfRvl1EdapLw2fLhJsndq
  of6G/DhWS7OEIz4RYUYirwUBz0E3lBPYc/DNDQN9hMXL+P2NItKma9HRNaGSFeET
  ICt3bkEJrQ30gezdAgMBAAE=
  -----END PUBLIC KEY-----`,
  needVerification: true,
  googleSiteVerificationContent: '',
  GTAG: 'UA-203868702-1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
