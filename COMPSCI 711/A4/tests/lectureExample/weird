a.out: main.o simulator.o queue.o stack.o options.o 
	g++ -o a.out main.o simulator.o queue.o stack.o options.o

main.o: main.cpp simulator.h options.h
	g++ -c main.cpp

simulator.o: simulator.cpp simulator.h queue.h stack.h
	g++ -c simulator.cpp

queue.o: queue.cpp queue.h
	g++ -c queue.cpp

stack.o: stack.cpp stack.h
	g++ -c stack.cpp

options.o: options.cpp options.h
	g++ -c options.cpp