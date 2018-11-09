Assignment#2 for 2406 <br />
This is a course project of COMP2406 in Carleton University.  <br />
This project is implemented by Tiancheng Zhao Student #100988646, Payton Pei Student# 101065299. <br />
The source code of this project is considered to be the intellectual property belongs to Tiancheng Zhao and Payton Pei.  <br />
Email: <br />
TianchengZhao@cmail.carleton.ca <br />
paytonpei@cmail.carleton.ca <br />


Environment Info: <br />
Operating System: macOS Mojave 10.14 <br />
Browser: Chrome [Version 69.0.3497.100 (Official Build) (64-bit)] <br />
Node Version: v10.10.0 <br />
NPM Version: 6.4.1 <br />
Environment Info: <br />
Operating System: macOS Mojave 10.14 <br />
Browser: Chrome [Version 69.0.3497.100 (Official Build) (64-bit)] <br />
Node Version: 8.11.1 <br />
NPM Version: 6.4.1 <br />

Install: <br />
socket.io is required for this programme<br />

Test Instruction: <br />
0.You need to install this socket.io module for this project.<br />
1.Locate the file directory that has server.js <br />
2.Type node server.js in terminal <br />
3.Open http://localhost:3000/assignment3 with browser in a tab and enter the name <br />
4.Open another http://localhost:3000/assignment3 and enter the name<br />
5.Open another with the same address and this tab will be spectating the game.<br />
6.Drag the ball backforth and release to shoot forth, recommend drag longer distance to ensure large force<br />
7.Maximum 2 players allowed at the same time, any more players will line up in the player waitlist<br />
8.Any player exit the game or disconnect with the server will give the player in the waitlist a position to join the game, the player will play instead of the one who disconnected<br />
9.The server will tell which player's turn, and only the player on his turn he can play the game.


Issue: <br />
1.we may not be able to pull the stone and release it, but we make it like the way the video demonstrate for 1406<br />
2.The resolution of the big picture on the left hand side is not clear enough since we just made a deep copy of the right one.<br />
3.We draw them in two different canvases<br />
4.(Solved)You need to click the screen to skip your round, We may not be able to let user willingly to stop his turn and become a spectator. We spend so much time on this assignment and it's really hard to accomplish this since we are not really familar with the socket.io module.<br />

Recommend Instruction:
1.open three client windows to join two players in the game, one player in the waitlist
2.player1's turn
3.player2's turn
4.close player2's window tab, disconnect
5.player1's turn
6.player3 join the game
7.player3's turn
