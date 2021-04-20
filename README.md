# Tic Tac Toe

![Board](https://i.imgur.com/TKpbXgr.png)

Unbeatable tic tac toe AI, using an algorithm similar to minimax , in vanilla JavaScript as a [webpage]( https://greece4ever.github.io/Tic-Tac-Toe/ ) and as an [android `.apk`](https://github.com/Greece4ever/Tic-Tac-Toe/releases/tag/0.0.1) using App Inventor and Java (with app inventor extensions).

![Android Board](https://i.imgur.com/w1R19kb.png)

### Building app inventor extension

On Debian/Ubuntu and derivatives you can simply run the `install` script
```sh
git clone https://github.com/Greece4ever/Tic-Tac-Toe.git tic_tac_toe && 
cd tic_tac_toe/ &&
sudo /usr/bin/bash install
```
Generally what is required is a [javac](https://docs.oracle.com/javase/7/docs/technotes/tools/windows/javac.html) and [ant](https://ant.apache.org/). You clone [this repo](https://github.com/mit-cml/extension-template) and replace the `src/` folder there with the one on this repository, then run `ant extensions`. More details can be found [here](https://saitwalshreyash19.medium.com/writing-your-first-app-inventor-2-extension-dc6d5d4ff824) and [here](https://saitwalshreyash19.medium.com/writing-extensions-for-app-inventor-2-and-kodular-7d20092bff16).
