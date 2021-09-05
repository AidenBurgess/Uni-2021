a.out: main.o simulator.o queue.o stack.o options.o stackUser3.o
	g++ -o a.out main.o simulator.o queue.o stack.o options.o stackUser3.o

main.o: main.cpp simulator.h options.h stackUser3.o
	g++ -c main.cpp

simulator.o: simulator.cpp simulator.h queue.h stack.h
	g++ -c simulator.cpp

queue.o: queue.cpp queue.h
	g++ -c queue.cpp

stack.o: stack.cpp stack.h
	g++ -c stack.cpp

options.o: options.cpp options.h
	g++ -c options.cpp

stackUser.o: stackUser.cpp stack.o
	g++ -c stackUser.cpp

stackUser2.o: stackUser2.cpp stackUser.o
	g++ -c stackUser2.cpp

stackUser3.o: stackUser3.cpp stackUser2.o
	g++ -c stackUser3.cpp