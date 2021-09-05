#include <iostream>
#include "simulator.h"
#include "queue.h"
#include "stack.h"
using namespace std;

void Simulator::start()
{
  Queue q;
  q.createQueue();
  Stack s;
  s.createStack();
  cout << "Simulator::start()" << endl;
}