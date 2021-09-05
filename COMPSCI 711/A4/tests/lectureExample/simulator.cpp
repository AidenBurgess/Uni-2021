#include <iostream>
#include "simulator.h"
#include "queue.h"
#include "stack.h"
using namespace std;

void Simulator::start()
{
  Queue q;
  q.createQueue();
  
  cout << "Simulator::start()" << endl;
}