#!/usr/bin/env python3
# -*- coding: utf-8 -*-

'''Change file name in batch from 
KdaTest_NXLE_AutoTable_Equipment01--new.xml 
to 
KdaTest_NXLE_AutoTable_Equipment01--master.xml 
'''

__author__ = 'Wang Tao'

import os, sys

def changeFileNameInDir(dir, fromstr, tostr):
    if not dir.endswith("\\"):
        dir += "\\"

    count= 0
    for i in os.listdir(dir):
        if os.path.isfile(dir + i):
            if i.find(fromstr) < 0:
                print(">>#{0}: {1} does not contain '{2}'".format(count, i, fromstr))
            else:
                splitStr = i.split(fromstr)
                newName = splitStr[0] + tostr + splitStr[1]
                try:
                    os.rename(dir + i, dir + newName)
                    print(">>#{0}: {1}-->{2}".format(count, i, newName))
                except:
                    print(">>#{0}: {1} is failed to rename to {2}".format(count, i, newName))
            count += 1


if __name__ == "__main__":

    dir = ""
    fromStr = ""
    toStr = ""
    mode = 0

    for i in sys.argv:
        if i == "-d":
            mode = 1
        elif i == "-from":
            mode = 2
        elif i =="-to":
            mode = 3 
        elif i == "-h" or i=="-help" or i=="-?":
            mode = 0
        else:
            if mode == 1:
                dir = i
            elif mode == 2:
                fromStr = i
            elif mode == 3:
                toStr = i
            else:
                pass

    if mode == 0:
        print("**** changeFileName.py usage: ****")
        print("\tSyntax: changeFileName.py -d directory -from stringToChange -to stringChangeTo -?|-h|-help.")
        print("\t-d:        the directory to change file name.")
        print("\t-from:     the string need to change.")
        print("\t-to:       the string changes to.")
        print("\t-?|h|help: log usage.")
    else:
        while fromStr == "":
            fromStr = input("**** Please set the string want to change:")
        while toStr == "":
            toStr = input("**** Please set the string changes to:")
        if dir == "":
            dir = os.getcwd()

        print("**** changeFileName.py will change file name from '{0}' to '{1}' in directory {2}...".format(fromStr, toStr, dir) )
        changeFileNameInDir(dir, fromStr, toStr)

    input("**** Press enter key to exit...")

