# 🚀 DEPLOYMENT GUIDE - Railway.app

Deploy **The Last Gunslinger** to the web with Railway!

## ⚡ Quick Start (5 minutes)

### Step 1: Push to GitHub

First, create a GitHub repository and push your code:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: The Last Gunslinger 3D Game"

# Add GitHub remote (replace with your repo)
git remote add origin https://github.com/YOUR-USERNAME/cowboy-game.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Railway

1. **Go to Railway.app:**
   - Visit https://railway.app
   - Click "Start a New Project"
   - Select "Deploy from GitHub"

2. **Connect GitHub:**
   - Click "Connect GitHub"
   - Authorize Railway to access your repositories
   - Select `cowboy-game` repository (or whatever you named it)

3. **Railway Auto-Detects Node.js:**
   - Railway automatically detects your Node.js project
   - It reads `package.json`
   - Deploys using `npm start`

4. **Wait for Deployment:**
   - Railway builds and deploys your app
   - Takes about 1-2 minutes
   - You'll see logs in real-time

5. **Get Your URL:**
   - Once deployed, Railway gives you a public URL
   - Example: `https://cowboy-game-production.up.railway.app`
   - This is your live game! 🎉

### Step 3: Enable WebSockets (Important!)

1. Go to your Railway project dashboard
2. Click on your service (the Node.js app)
3. Go to **Settings → Networking**
4. Toggle **"Public Networking"** to ON
5. WebSockets are now enabled!

## 📱 Share Your Game

Your game is now live! Share this URL:
```
https://your-railway-url.up.railway.app
```

Players can:
- Play from **any device**
- Join **multiplayer** lobbies
- No installation needed!

---

## 🔍 Troubleshooting

### "Connection failed" in game
- Ensure you set the correct URL in `game.html`
- Using localhost? Change it to your Railway URL

### No players visible
- Check WebSocket is enabled in Railway settings
- Try refreshing the page
- Check browser console for errors

### Build fails
- Ensure `package.json` exists
- Check `server.js` exists and has no syntax errors
- Verify Node.js version compatibility

---

## 🎯 Optional: Custom Domain

Want a custom domain like `cowboy-game.com`?

1. In Railway dashboard, go to **Settings → Domains**
2. Click "Add Custom Domain"
3. Enter your domain
4. Follow DNS setup instructions
5. Done! 🎉

---

## 📊 Monitor Your Game

Railway provides useful metrics:
- **Logs** - See what's happening
- **Metrics** - CPU, Memory, Network usage
- **Deployments** - History of all deploys
- **Environment Variables** - Configure settings

### View Logs:
```
Railway Dashboard → Logs tab
```

---

## 🔄 Easy Updates

To update your live game:

```bash
# Make changes to code
# ...

# Commit and push
git add .
git commit -m "Update: [your changes]"
git push origin main
```

Railway automatically redeploys! ✨

---

## 💡 Performance Tips

1. **Use Railway's free tier** - Good enough for ~100 concurrent players
2. **Monitor players** - Watch metrics in Railway dashboard
3. **Optimize assets** - Keep 3D models optimized
4. **Cache static files** - Babylon.js files are cached by browsers

---

## 🛡️ Security

Your game is secure by default:
- HTTPS enabled automatically
- DDoS protected by Railway
- No credit card needed (free tier)

---

## 📈 Next Steps

After deployment:

1. **Test multiplayer** - Invite friends to play
2. **Collect feedback** - Improve the game
3. **Add features** - More enemies, levels, guns
4. **Scale up** - Upgrade Plan if needed
5. **Monetize** - Add cosmetics or battle pass

---

## 📞 Need Help?

- **Railway Docs:** https://docs.railway.app
- **Socket.io Guide:** https://socket.io/docs/
- **Express Guide:** https://expressjs.com/
- **Babylon.js Docs:** https://www.babylonjs-playground.com/

---

## 🎮 Your Live Game!

Once deployed, your URL will be something like:

```
https://cowboy-game-XXXXX.up.railway.app
```

**Share it with the world!** 🌍

---

### Summary
- ✅ Push code to GitHub
- ✅ Deploy via Railway
- ✅ Enable WebSockets
- ✅ Share your URL
- ✅ Play with friends!

**That's it! Your game is now live.** 🚀
