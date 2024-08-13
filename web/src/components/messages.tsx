import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Message } from './message';
import { getRoomMessages } from '../http/get-room-messages';
import { useMessagesWebSockets } from '../hooks/use-messages-websockets';

export function Messages() {
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error('Messages component must be used withn room page');
  }

  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomId],
    queryFn: () => getRoomMessages({ roomId }),
  });

  useMessagesWebSockets({ roomId });

  const sortedMessages = data.messages.sort((a, b) => {
    if (a.answered === b.answered) {
      return b.amountOfReactions - a.amountOfReactions;
    }

    return Number(a.answered) - Number(b.answered);
  });

  return (
    <ol className='list-decimal list-outside px-3 space-y-8'>
      {sortedMessages.map((message) => (
        <Message
          id={message.id}
          key={message.id}
          text={message.text}
          amountOfReactions={message.amountOfReactions}
          answered={message.answered}
        />
      ))}
    </ol>
  );
}
