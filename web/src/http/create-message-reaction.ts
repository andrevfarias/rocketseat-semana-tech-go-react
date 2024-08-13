interface CreeateMessageReactionRequest {
  roomId: string;
  messageId: string;
}

export async function creeateMessageReaction({
  roomId,
  messageId,
}: CreeateMessageReactionRequest) {
  await fetch(
    `${
      import.meta.env.VITE_APP_API_URL
    }/rooms/${roomId}/messages/${messageId}/react`,
    { method: 'PATCH' }
  );
}
