#include "options.h"
#include "simulator.h"
#include "stackUser3.h"
#include <cstdlib>

using namespace std;

int main()
{
  Options options;
  Simulator simulator;
  simulator.start();

  stackUser3();

  return 0;
}