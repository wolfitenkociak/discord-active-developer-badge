import {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    SlashCommandBuilder,
    type Interaction,
    type ChatInputCommandInteraction,
  } from "discord.js"
  import * as dotenv from "dotenv"
  import * as readline from "readline"
  import * as fs from "fs"
  import * as path from "path"
  
  // Load environment variables
  dotenv.config()
  
  async function main() {
    // Get token from env or prompt
    let token = process.env.DISCORD_TOKEN
  
    if (!token) {
      // Create .env file if it doesn't exist
      const envPath = path.join(__dirname, "../.env")
  
      console.log("Token nie znaleziony. Wpisz token swojego bota Discord:")
  
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })
  
      token = await new Promise<string>((resolve) => {
        rl.question("> ", (input: string) => resolve(input))
      })
  
      // Save token to .env
      fs.writeFileSync(envPath, `DISCORD_TOKEN=${token}`)
      rl.close()
    }
  
    // Create Discord client with all intents to ensure we receive all events
    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    })
  
    // Register slash command
    const commands = [new SlashCommandBuilder().setName("odznaka").setDescription("Wpisz aby odebrać odznake!").toJSON()]
  
    // Make sure token is defined before using it
    if (!token) {
      throw new Error("Token is required to run the bot")
    }
  
    const rest = new REST({ version: "10" }).setToken(token)
  
    client.once("ready", async () => {
      if (!client.user) return
  
      console.log(`Zalogowano jako ${client.user.tag}`)
      console.log(
        `Link zaproszeniowy: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands%20bot`,
      )
  
      try {
        console.log("Rozpoczynam rejestrację komendy /odznaka...")
  
        // Register commands globally (this might take up to an hour to propagate)
        const data = await rest.put(Routes.applicationCommands(client.user.id), { body: commands })
  
        console.log("Komenda /odznaka została zarejestrowana pomyślnie:", data)
      } catch (error) {
        console.error("Błąd podczas rejestracji komendy:", error)
      }
    })
  
    // Log all incoming interactions for debugging
    client.on("interactionCreate", async (interaction: Interaction) => {
      console.log(`Otrzymano interakcję typu: ${interaction.type}`)
  
      if (!interaction.isChatInputCommand()) {
        console.log("To nie jest komenda ChatInput, pomijam...")
        return
      }
  
      console.log(`Otrzymano komendę: ${interaction.commandName}`)
  
      if (interaction.commandName === "odznaka") {
        console.log("Obsługuję komendę /odznaka dla użytkownika:", interaction.user.tag)
  
        try {
          await (interaction as ChatInputCommandInteraction).reply({
            content: `**Informacje o odznace Active Developer**
  • Odznaka zostanie przyznana w ciągu 24h od użycia tej komendy
  • Po 24h sprawdź status na: https://discord.com/developers/active-developer
  • Więcej informacji: https://discord.gg/discord-developers (kanał #active-dev-badge)`,
            ephemeral: false,
          })
  
          console.log("Odpowiedź na komendę /odznaka wysłana pomyślnie")
        } catch (error) {
          console.error("Błąd podczas odpowiadania na komendę /odznaka:", error)
        }
      }
    })
  
    // Add error handling
    client.on("error", (error) => {
      console.error("Błąd klienta Discord:", error)
    })
  
    // Login to Discord
    try {
      console.log("Próba logowania do Discord...")
      await client.login(token)
      console.log("Zalogowano pomyślnie")
    } catch (error) {
      console.error("Błąd podczas logowania:", error)
    }
  }
  
  main().catch((error) => {
    console.error("Błąd główny:", error)
  })
  
  