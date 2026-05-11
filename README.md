# 🔥 Ring of Fire - Angular Card Game

> Ein interaktives Kartenspiel mit Angular und Firebase für Echtzeit-Multiplayer-Erlebnis.

## 🎮 Features

- ✅ **Kartenspiel-Logik** - Vollständige Game-Mechanik
- ✅ **Echtzeit-Multiplayer** - Firebase Realtime Database
- ✅ **Benutzer-Profile** - Spieler-Management mit Auth
- ✅ **Score-Tracking** - Statistiken und Leaderboards
- ✅ **Responsive UI** - Optimiert für alle Geräte
- ✅ **Animations** - Smooth Game-Feedback

## 🔧 Tech Stack

- **Frontend:** Angular 17+
- **Backend:** Firebase/Firestore
- **Echtzeit:** Firebase Realtime Database
- **Authentifizierung:** Firebase Authentication
- **Styling:** SCSS/CSS3

## 🚀 Installation & Setup

```bash
# 1. Dependencies installieren
npm install

# 2. Firebase konfigurieren
# - Firebase Projekt erstellen
# - Config in src/environments/environment.ts eintragen

# 3. Dev-Server starten
npm start

# 4. App im Browser öffnen
# http://localhost:4200
```

## 📖 Spielanleitung

1. **Registrierung** - Neues Konto erstellen
2. **Einloggen** - Mit Credentials anmelden
3. **Spiel starten** - Neues Spiel erstellen oder beitreten
4. **Spielen** - Karten-Regeln folgen und gewinnen!

## 🔨 Verfügbare Befehle

```bash
npm start              # Entwicklungs-Server
npm run build         # Production Build
npm test              # Unit Tests
npm run e2e           # End-to-End Tests
```

## 📁 Projektstruktur

```
src/
├── app/
│   ├── components/       # UI-Komponenten
│   ├── pages/           # Game Pages
│   ├── services/        # Game & Firebase Services
│   ├── models/          # Data Models
│   └── guards/          # Route Guards
├── assets/              # Bilder & Icons
├── environments/        # Firebase Config
└── styles/             # Globale Styles
```

## 🔐 Firebase Setup

1. Firebase Console öffnen
2. Realtime Database erstellen
3. Authentication aktivieren
4. Config in `environment.ts` eintragen:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DB_URL',
    projectId: 'YOUR_PROJECT_ID',
    // ...
  }
};
```

## 🚢 Deployment

```bash
# Production Build
npm run build

# Deploy mit Firebase
firebase deploy

# Oder mit Vercel/Netlify
vercel deploy
```

## 🆘 Troubleshooting

### Firebase Connection fehlgeschlagen
- Firebase Config in `environment.ts` überprüfen
- Firebase Projektregeln überprüfen
- Browser Console für Fehler checken

### Echtzeit-Updates funktionieren nicht
- Firestore Regeln überprüfen
- Internet-Connection testen
- Firebase Admin SDK Permissions überprüfen

---

_Ein spannendes Multiplayer-Kartenspiel mit Angular & Firebase._