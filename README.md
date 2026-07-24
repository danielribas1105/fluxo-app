# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Install others dependencies

After run:

```bash
npm install lucide-react-native react-native-svg
```

## Project layout

```
fluxo-app/
├── src/
│   ├── app/                          # Expo Router — só rotas finas (re-export)
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── goals.tsx             # re-export de features/goals
│   │   │   ├── home.tsx              # re-export de features/home
│   │   │   ├── more.tsx              # re-export de features/more
│   │   │   └── transaction.tsx       # re-export de features/transactions
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx                 # re-export de features/auth
│   │   └── onboarding.tsx            # re-export de features/onboarding
│   │
│   ├── components/
│   │   ├── ui/                       # design system (Button, Card, Input...)
│   │   └── common/                   # genéricos, sem lógica de domínio
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   └── login-screen.tsx
│   │   ├── goals/
│   │   │   ├── goals-screen.tsx
│   │   │   ├── components/
│   │   │   └── hooks/                # ex: useGoals, useCreateGoal
│   │   ├── home/
│   │   │   ├── home-screen.tsx
│   │   │   └── components/
│   │   │       ├── header.tsx
│   │   │       └── summary-card.tsx
│   │   ├── more/
│   │   │   └── more-screen.tsx
│   │   ├── onboarding/
│   │   │   └── onboarding-screen.tsx
│   │   └── transactions/
│   │       ├── transactions-screen.tsx
│   │       ├── components/
│   │       └── hooks/                # ex: useLancamentos
│   │
│   ├── entities/                     # domínio central, compartilhado entre features
│   │   └── lancamento/
│   │       ├── types.ts              # Lancamento, origemTipo, origemId
│   │       ├── lancamento-service.ts # lancamentoService, upsertPorOrigem
│   │       └── queries.ts            # hooks TanStack Query (useLancamentoQuery etc.)
│   │
│   ├── lib/
│   │   ├── db/                       # setup do banco local (ex: SQLite/AsyncStorage adapters)
│   │   ├── create-crud-service.ts    # factory genérica
│   │   └── query-client.ts           # config do TanStack Query
│   │
│   ├── store/                        # átomos Jotai globais
│   │
│   ├── hooks/                        # hooks realmente globais (não ligados a feature)
│   ├── constants/
│   └── css/                          # ou mover para dentro de components/ui se for tema/tokens
│
├── assets/
├── .gitignore
├── .prettierignore
├── .prettierrc
├── app.json
├── eslint.config.js
├── expo-env.d.ts
├── package.json
├── README.md
└── tsconfig.json
```
