### Discord Active Developer Badge Bot
Ten bot pozwala na zdobycie odznaki Active Developer na Discord poprzez wpisanie komendy `/odznaka`.

## Wymagania
- Node.js 16.9.0 lub nowszy
- pnpm
- Token bota Discord (nie token użytkownika)
- Serwer Discord, na którym masz uprawnienia administratora


## Instalacja
1. Zainstaluj zależności:

```shellscript
pnpm install
```

2. Skopiuj plik `.env.example` do `.env` i uzupełnij wymagane dane:


```shellscript
cp .env.example .env
```

Następnie edytuj plik `.env` i uzupełnij:

```plaintext
DISCORD_TOKEN=twój_token_bota
```

## Jak uzyskać token bota Discord?

1. Przejdź do [Discord Developer Portal](https://discord.com/developers/applications)
2. Kliknij "New Application" i nadaj nazwę swojej aplikacji
3. Przejdź do zakładki "Bot" w menu po lewej stronie
4. Kliknij "Add Bot" i potwierdź
5. Pod sekcją "TOKEN" kliknij "Reset Token" lub "Copy" jeśli token jest już widoczny
6. Skopiuj token i umieść go w pliku `.env`


## Użycie

Po skonfigurowaniu pliku `.env`, możesz uruchomić bota:

```shellscript
pnpm run dev
```

Bot automatycznie:

1. Zaloguje się do Discord API
2. Zarejestruje komendę `/odznaka`
3. Wyświetli link zaproszeniowy w konsoli


Aby zaprosić bota na swój serwer:

1. Skopiuj link zaproszeniowy wyświetlony w konsoli
2. Otwórz go w przeglądarce
3. Wybierz serwer, na który chcesz dodać bota
4. Upewnij się, że zaznaczone są uprawnienia `applications.commands` i `bot`
5. Kliknij "Autoryzuj"


Po zaproszeniu bota na serwer, możesz użyć komendy `/odznaka` aby otrzymać informacje o tym, jak zdobyć odznakę Active Developer.

## Rozwiązywanie problemów

Jeśli komenda `/odznaka` nie jest widoczna:

1. Upewnij się, że bot został zaproszony z właściwymi uprawnieniami
2. Poczekaj kilka minut na propagację komendy w systemie Discord
3. Odśwież klienta Discord (Ctrl+R)
4. Sprawdź logi konsoli, czy nie ma błędów podczas rejestracji komendy


## Uwagi
Aby zdobyć odznakę Active Developer, musisz:
- Uruchomić bota na serwerze
- Użyć komendy `/odznaka` przynajmniej raz
- Poczekać 24 godziny
- Odwiedzić stronę [https://discord.com/developers/active-developer](https://discord.com/developers/active-developer)
- Wypełnić formularz, aby odebrać odznakę
- Bot musi pozostać uruchomiony tylko do momentu użycia komendy
- Odznaka zostanie przyznana w ciągu 24 godzin od użycia komendy
