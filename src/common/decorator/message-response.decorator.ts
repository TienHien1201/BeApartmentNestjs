import { SetMetadata } from '@nestjs/common';

export const MESSAGE_RESPONSE = `MESSAGE_REPONSE`;

export const MessageResonse = (message: string) => {
  return SetMetadata(MESSAGE_RESPONSE, message);
};
