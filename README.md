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

Recommand Test Instruction: <br />(Based on our degisn of the programme, we recommand you to run the recommand instruction)<br />
0.You need to install this socket.io module for this project. Type npm install socket.io in the directory with server.js<br />
1.Locate the file directory that has server.js <br />
2.Type node server.js in terminal <br />
3.open three client windows to join two players in the game, one player in the waitlist<br />
4.player1's turn<br />
5.player2's turn<br />
6.close player2's window tab, disconnect<br />
7.player1's turn<br />
8.player3 join the game<br />
9.player3's turn<br />
10.You will not be able to continue play with the stone unless the website alerts so.

Issue: <br />
1.we may not be able to pull the stone and release it, but we make it like the way the video demonstrate for 1406<br />
2.The resolution of the big picture on the left hand side is not clear enough since we just made a deep copy of the right one.<br />
3.We draw them in two different canvases<br />
4.(Solved)You need to click the screen to skip your round, We may not be able to let user willingly to stop his turn and become a spectator. We spend so much time on this assignment and it's really hard to accomplish this since we are not really familar with the socket.io module.<br />

