#include <omp.h>
#include <iostream>
using namespace std;
int main()
{
#pragma omp parallel num_threads(16)

  {
    cout << "Hello from thread "
         << omp_get_thread_num()
         << '!' << endl;
#pragma omp barrier
    if (omp_get_thread_num() == 0)
      cout << "Total threads is "
           << omp_get_num_threads()
           << endl;
  }
}
