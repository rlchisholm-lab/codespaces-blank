#!/bin/bash

# Quick deployment setup script
# Usage: bash deploy.sh

echo "🚀 The Last Gunslinger - Deployment Setup"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
else
    echo "✅ Git repository already exists"
fi

# Add all files
echo "📝 Staging all files..."
git add .

# Check if any changes to commit
if git diff-index --quiet HEAD --; then
    echo "⚠️  No changes to commit"
else
    echo "💾 Committing files..."
    git commit -m "Deploy: The Last Gunslinger - 3D Cowboy Game"
fi

echo ""
echo "=========================================="
echo "✅ Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Create a repository on GitHub"
echo "2. Run: git remote add origin https://github.com/YOUR-USERNAME/cowboy-game.git"
echo "3. Run: git branch -M main && git push -u origin main"
echo "4. Go to https://railway.app"
echo "5. Deploy from GitHub"
echo ""
echo "Your game will be live in minutes! 🎮"
