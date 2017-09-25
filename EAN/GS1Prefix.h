//GS1Prefix.h
#include <iostream>
#include <fstream>
#include <iomanip>
#include <cstring>
#include <stdio.h>
#include <stdlib.h>
const int MAX = 700;

class Prefix
{
    int  num;             // number of entries
    int  area[MAX];      // area elements
    char pubLow[MAX][8]; // low end of publisher range
    char pubHgh[MAX][8]; // high end of publisher range
    int  pubLen[MAX];    // no of chars in publisher string
	public:
		Prefix(const char*);
		bool isRegistered(int) const;
		int minNoDigits(int) const;
		bool isRegistered(int, const char*) const;
};
		