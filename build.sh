sudo apt update
# Java
sudo apt install default-jre
sudo apt install default-jdk
sudo apt-get install ant
# cURL
sudo apt-get install curl
sudo apt-get install unzip

curl --output libs.zip -get -L https://github.com/Greece4ever/Tic-Tac-Toe/releases/download/0.0.1/libs.zip &&
mv libs.zip ./android/lib/ &&
unzip libs.zip && 
cd android &&
ant extensions

