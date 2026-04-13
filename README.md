# 🤠 The Last Gunslinger - 3D Cowboy Game

A thrilling 3D first-person cowboy shooter with solo and multiplayer modes, fully optimized for desktop and mobile!

## 🎮 Game Features

### Solo Campaign
- **Story-driven gameplay** with immersive narrative
- **Wave-based combat system** with progressive difficulty
- **Offline play** - no internet required
- **Multiple difficulty levels** (Easy, Normal, Hard)

### Multiplayer Mode
- **Real-time multiplayer** with up to 4 players per room
- **WebSocket synchronization** using Socket.io
- **Live player positions** and health tracking
- **In-game chat** for team communication
- **Shared wave progression** across all players
- **Kill tracking** and scoring system

### Mobile Support
- **Fully responsive design** for all devices
- **Touch-friendly UI** with large buttons
- **Portrait & Landscape** mode support
- **Mobile joystick controls** (coming soon)
- **Optimized performance** for low-end devices

### 3D Graphics
- **Babylon.js** rendering engine
- **First-person perspective**
- **Dynamic lighting and environment**
- **Smooth collision detection**

## 🚀 Deployment

Want to play online with friends? Deploy for free to Railway:

### Quick Deploy to Railway (5 minutes)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy: The Last Gunslinger"
   git push origin main
   ```

2. **Deploy on Railway:**
   - Go to https://railway.app
   - Click "Start a New Project"
   - Select "Deploy from GitHub"
   - Choose your repository
   - Railway auto-deploys! 🎉

3. **Get Public URL:**
   - Your game will be live at: `https://your-railway-app.up.railway.app`
   - Share with friends!

📖 **See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide**

---

### Prerequisites
- Node.js (v14+)
- npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm start
```

The server will start on `http://localhost:8000`

3. **Open in browser:**
- Desktop: Navigate to `http://localhost:8000`
- Mobile: Use your phone's browser to visit `http://[your-pc-ip]:8000`

## 🎯 How to Play

### Controls
**Desktop:**
- 🖱️ **Mouse** - Aim and look around
- **⬆️⬇️⬅️➡️ or WASD** - Move
- 🖱️ **Left Click** - Shoot
- **SPACE** - Reload
- **Enter** (in chat) - Send message

**Mobile:**
- 👆 **Tap** - Shoot
- 🎮 **Joystick** (bottom-left) - Move
- 👆 **Swipe** - Aim
- 💬 **Chat** - On-screen buttons

### Solo Campaign
1. Click "SOLO CAMPAIGN" from main menu
2. Select difficulty level
3. Click "START"
4. Survive waves of enemies
5. Complete objectives to progress
6. Reach higher waves for better scores

### Multiplayer
1. Click "MULTIPLAYER" from main menu
2. Enter your player name
3. Enter room ID (or leave blank for random)
4. Select difficulty level
5. Click "JOIN"
6. Wait for game to start (up to 4 players)
7. Work with team to survive waves
8. Use chat to communicate with teammates

## 📁 File Structure

```
.
├── server.js              # Node.js WebSocket server
├── package.json           # Dependencies
├── game.html              # Main unified game (ALL IN ONE!)
├── index.html             # Redirect to game.html
└── README.md              # This file
```

## 🔧 Server Architecture

### Socket.io Events

**Client → Server:**
- `joinGame` - Join a room
- `updatePlayer` - Send player position/rotation/health
- `playerShot` - Fire weapon
- `startGame` - Start the game
- `chatMessage` - Send chat message

**Server → Client:**
- `joinedRoom` - Acknowledge room join
- `playerJoined` - New player joined
- `playerUpdated` - Other player position update
- `playerFired` - Other player shot
- `playerLeft` - Player disconnected
- `chatMessage` - Chat message received

## 📱 Mobile Optimization

- **Responsive Layout** - Adapts to any screen size
- **Touch Controls** - Optimized for touchscreen
- **Battery Efficient** - Optimized frame rate
- **Low Bandwidth** - Efficient networking
- **Landscape Support** - Play in any orientation

## 🐛 Troubleshooting

**Can't connect to server?**
- Ensure `npm install` was run
- Check that port 8000 is available
- Verify server is running with `npm start`

**Mobile connection issues?**
- Use PC's actual IP address instead of localhost
- Ensure both devices are on same network
- Check firewall settings

**Performance issues?**
- Lower quality settings on low-end devices
- Close other browser tabs
- Update graphics drivers

**Players not visible?**
- Wait for all players to join
- Check network connection
- Try refreshing the page

## 🌟 Single Website Benefits

✅ **All in One** - No need to manage multiple files  
✅ **Easy Updates** - Single file to deploy  
✅ **Fast Loading** - Optimized code bundling  
✅ **Consistent UI** - Unified design system  
✅ **Mobile Friendly** - Responsive from the start

## 📈 Technology Stack

- **Frontend:** HTML5, Canvas, Babylon.js
- **Backend:** Node.js, Express.js, Socket.io
- **Graphics:** Babylon.js 3D Engine
- **Networking:** WebSocket (Socket.io)
- **Responsive:** CSS Media Queries

## 🎨 Customization

Edit `game.html` to customize:
- Colors: Search for `#FFD700` (gold) or `#667eea` (purple)
- Difficulty: Adjust enemy spawn rates
- UI: Modify layout using CSS media queries
- Game Balance: Tweak damage, ammo, health values

## 📝 License

This project is open source and available under the MIT License.

---

**The Last Gunslinger - Where every shot counts!** 🔫

Access the game: **http://localhost:8000**

