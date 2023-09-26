import "./HomePage.css";
import { FormEvent, useCallback, useMemo, useState } from "react";

import { socket } from "../../lib";
import { useTranslate } from "../../hooks/useTranslate";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigateTo } from "../../hooks";
import WebSocketProvider from "../../providers/WebSocketProvider";
import SendUsernameService from "../../services/SendUsernameService";
import { routes } from "../../constants";

export const HomePage = () => {
  const navigate = useNavigateTo();
  const { t } = useTranslate();
  const [username, setUsername] = useState<string>("");
  const chatRoute = useMemo(() => routes.chat, []);

  const handleSendUsername = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (username) {
        const webSocketProvider = new WebSocketProvider(socket);
        const sendUsernameService = new SendUsernameService(webSocketProvider);
        sendUsernameService.execute(username);
        navigate(chatRoute);
      }
    },
    [navigate, username, chatRoute]
  );

  const handleUsername = useCallback((newUsername: string) => {
    setUsername(newUsername);
  }, []);

  return (
    <main className="container-homepage">
      <section className="container-form">
        <form
          className="container-form__form-register"
          onSubmit={(event) => handleSendUsername(event)}
        >
          <Title
            adjustClassname="container-form__adjust-margin-title"
            title={t("home.title")}
          />
          <Input
            onChangeValue={handleUsername}
            value={username}
            placeholder={t("home.placeholderInput")}
            adjustClassname="container-form__adjust-margin-input"
          />
          <Button
            label={t("home.buttonLabel")}
            typeButton="submit"
            disabled={!username}
          />
        </form>
      </section>
    </main>
  );
};
