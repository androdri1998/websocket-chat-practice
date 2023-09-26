import { FormEvent, useCallback, useState } from "react";

import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { socket } from "../../../../lib";
import { MessageItem } from "../../interfaces/MessageItem";
import SendMessageService from "../../../../services/SendMessageServicce";
import { addValueToANewArray } from "../../../../utils/arrayUtils";
import WebSocketProvider from "../../../../providers/WebSocketProvider";
import { useTranslate } from "../../../../hooks";

interface SendMessageFormProps {
  messageList: MessageItem[];
  handleMessageList: (newMessageList: MessageItem[]) => void;
}

export const SendMessageForm = ({
  messageList,
  handleMessageList,
}: SendMessageFormProps) => {
  const { t } = useTranslate();
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (message) {
        const webSocketProvider = new WebSocketProvider(socket);
        const userSentMessage = true;
        const messageItem: MessageItem = {
          sentByUser: userSentMessage,
          message,
          name: t("general.you"),
        };

        const sendMessageService = new SendMessageService(webSocketProvider);
        sendMessageService.execute(message);

        const messageListClone: MessageItem[] = addValueToANewArray(
          messageList,
          messageItem
        ) as MessageItem[];
        handleMessageList(messageListClone);

        setMessage("");
      }
    },
    [message, messageList, t, handleMessageList]
  );

  const handleMessage = useCallback((newMessaveValue: string) => {
    setMessage(newMessaveValue);
  }, []);

  return (
    <form
      className="form-send-message"
      onSubmit={(event) => handleSendMessage(event)}
    >
      <Input
        onChangeValue={handleMessage}
        placeholder={t("chat.placeholderInput")}
        value={message}
        adjustClassname="form-send-message__adjust-input"
      />
      <Button
        typeButton="submit"
        label={t("chat.buttonLabel")}
        disabled={!message}
      />
    </form>
  );
};
