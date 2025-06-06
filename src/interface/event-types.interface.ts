// src\interface\event-types.interface.ts  
export interface EventPayloads {  
    'user.welcome': { name: string; email: string , activationLink: string };  
    'user.reset-password': { name: string; email: string; link: string };  
    'user.verify-email': { name: string; email: string; otp: string };  
  }
  