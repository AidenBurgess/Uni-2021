main.out: main.o message.o
	g++ -o main.out main.o message.o

main.o: main.cpp
	g++ -c main.cpp

message.o: message.cpp message.h
	g++ -c message.cpp
