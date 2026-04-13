// server.js - Multiplayer Game Server
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Serve static files
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 8000;

// Game state
let gameRooms = {};
let players = {};

class GameRoom {
    constructor(roomId) {
        this.id = roomId;
        this.players = {};
        this.enemies = [];
        this.wave = 1;
        this.score = 0;
        this.gameStarted = false;
        this.maxPlayers = 4;
        this.createdAt = Date.now();
    }

    addPlayer(playerId, playerData) {
        this.players[playerId] = {
            id: playerId,
            name: playerData.name,
            position: playerData.position || { x: 0, y: 0, z: 0 },
            rotation: playerData.rotation || { x: 0, y: 0, z: 0 },
            health: 100,
            ammo: 30,
            score: 0,
            kills: 0
        };
    }

    removePlayer(playerId) {
        delete this.players[playerId];
    }

    isFull() {
        return Object.keys(this.players).length >= this.maxPlayers;
    }

    isEmpty() {
        return Object.keys(this.players).length === 0;
    }
}

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log(`[${new Date().toLocaleTimeString()}] New player connected: ${socket.id}`);

    // Create or join a room
    socket.on('joinGame', (data) => {
        const roomId = data.roomId || 'default-room';
        const playerName = data.playerName || `Player_${socket.id.substr(0, 6)}`;

        if (!gameRooms[roomId]) {
            gameRooms[roomId] = new GameRoom(roomId);
        }

        const room = gameRooms[roomId];

        if (room.isFull() && !room.players[socket.id]) {
            socket.emit('roomFull', { message: 'Room is full' });
            return;
        }

        socket.join(roomId);
        players[socket.id] = { roomId, playerName };
        room.addPlayer(socket.id, {
            name: playerName,
            position: { x: Math.random() * 20 - 10, y: 0, z: Math.random() * 20 - 10 }
        });

        // Notify all players in room
        io.to(roomId).emit('playerJoined', {
            playerId: socket.id,
            playerName: playerName,
            players: room.players,
            roomId: roomId
        });

        socket.emit('joinedRoom', {
            roomId: roomId,
            playerId: socket.id,
            players: room.players,
            wave: room.wave,
            gameStarted: room.gameStarted
        });

        console.log(`[${new Date().toLocaleTimeString()}] ${playerName} joined room ${roomId}`);
    });

    // Update player position and rotation
    socket.on('updatePlayer', (data) => {
        if (!players[socket.id]) return;

        const roomId = players[socket.id].roomId;
        const room = gameRooms[roomId];

        if (room && room.players[socket.id]) {
            room.players[socket.id].position = data.position;
            room.players[socket.id].rotation = data.rotation;
            room.players[socket.id].health = data.health;
            room.players[socket.id].ammo = data.ammo;

            // Broadcast to other players in same room
            socket.broadcast.to(roomId).emit('playerUpdated', {
                playerId: socket.id,
                position: data.position,
                rotation: data.rotation,
                health: data.health,
                ammo: data.ammo
            });
        }
    });

    // Player fires weapon
    socket.on('playerShot', (data) => {
        if (!players[socket.id]) return;

        const roomId = players[socket.id].roomId;
        const room = gameRooms[roomId];

        if (room && room.players[socket.id]) {
            // Check if hit another player
            if (data.targetPlayerId && room.players[data.targetPlayerId]) {
                const targetPlayer = room.players[data.targetPlayerId];
                targetPlayer.health -= 10;

                io.to(roomId).emit('playerHit', {
                    shooterId: socket.id,
                    targetId: data.targetPlayerId,
                    damage: 10,
                    targetHealth: targetPlayer.health
                });

                if (targetPlayer.health <= 0) {
                    room.players[socket.id].kills++;
                    room.score += 50;

                    io.to(roomId).emit('playerDefeated', {
                        defeatedId: data.targetPlayerId,
                        killer: socket.id,
                        killerName: room.players[socket.id].name
                    });
                }
            }

            // Broadcast shot to others
            socket.broadcast.to(roomId).emit('playerFired', {
                playerId: socket.id,
                position: data.position,
                direction: data.direction
            });
        }
    });

    // Start game
    socket.on('startGame', () => {
        if (!players[socket.id]) return;

        const roomId = players[socket.id].roomId;
        const room = gameRooms[roomId];

        if (room) {
            room.gameStarted = true;
            io.to(roomId).emit('gameStarted', {
                wave: room.wave,
                players: room.players
            });
        }
    });

    // Wave progression
    socket.on('waveComplete', () => {
        if (!players[socket.id]) return;

        const roomId = players[socket.id].roomId;
        const room = gameRooms[roomId];

        if (room) {
            room.wave++;
            io.to(roomId).emit('waveUpdated', {
                wave: room.wave,
                players: room.players
            });
        }
    });

    // Chat message
    socket.on('chatMessage', (data) => {
        if (!players[socket.id]) return;

        const roomId = players[socket.id].roomId;
        const playerName = players[socket.id].playerName;

        io.to(roomId).emit('chatMessage', {
            playerId: socket.id,
            playerName: playerName,
            message: data.message,
            timestamp: new Date().toLocaleTimeString()
        });
    });

    // Disconnect
    socket.on('disconnect', () => {
        if (players[socket.id]) {
            const roomId = players[socket.id].roomId;
            const playerName = players[socket.id].playerName;

            if (gameRooms[roomId]) {
                io.to(roomId).emit('playerLeft', {
                    playerId: socket.id,
                    playerName: playerName
                });

                gameRooms[roomId].removePlayer(socket.id);

                // Clean up empty rooms
                if (gameRooms[roomId].isEmpty()) {
                    delete gameRooms[roomId];
                }
            }

            delete players[socket.id];
            console.log(`[${new Date().toLocaleTimeString()}] ${playerName} disconnected`);
        }
    });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 Cowboy Game Server running on port ${PORT}`);
    console.log(`🎯 WebSocket connections enabled`);
});
