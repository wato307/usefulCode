#!/usr/bin/env python3
# -*- coding: utf-8 -*-

'''find a specific file by given partial name with kaywords'''

__author__ = 'Wang Tao'

import sys
#import pprint
#print(sys.version) # To know which python version is used
#pprint.pprint(sys.path) # to know which directionaries the libs will finding
import os
import re
import time
from colorama import init, Fore, Back, Style

g_totalSkimed = 0
g_count = 0

def findContents(filename, keywords, dir, regex, isIgnoreCase):
    global g_totalSkimed
    global g_count
    # read file contents
    contents = []
    try:
        with open(dir+filename, 'r', encoding='UTF-8') as fp:
            contents = fp.readlines()
    except:
        try:
            with open(dir+filename, 'rb') as fp:
                contents = fp.readlines()
        except:
            print("**** Exception occurs to open&read file %s%s" % (dir, filename))
            return
    # start to search
    try:
        if regex:
            for i, line in enumerate(contents):
                #ignore one line if it has special encoding words
                try:
                    if type(line) == bytes:
                        line = line.decode('utf-8')
                except:
                    continue
                    
                if regex.search(line):
                    g_count += 1
                    #print("%03d--> %s%s in line %d" %(g_count,dir,filename, i+1))
                    print("%03d--> %s" %(g_count,dir) + Fore.YELLOW + "%s"%(filename) + Fore.RESET + " in line (%d)" % (i+1))
                    break
        else:
            mykeywords = keywords.lower() if isIgnoreCase else keywords
            for i, line in enumerate(contents):
                #ignore one line if it has special encoding words
                try:
                    if type(line) == bytes:
                        line = line.decode('utf-8')
                except:
                    continue

                if line.strip(): # this line is not blank 
                    myline = line.lower() if isIgnoreCase else line
                    if myline.find(mykeywords) >= 0:
                        g_count += 1
                        #print("%03d--> %s%s in line %d" %(g_count,dir,filename, i+1))
                        print("%03d--> %s" %(g_count,dir) + Fore.YELLOW + "%s"%(filename) + Fore.RESET + " in line (%d)" % (i+1))
                        break

    except:
        print("**** Exception: %s to find contents in file %s%s" % (sys.exc_info()[0], dir, filename))

    g_totalSkimed += 1
    print("**** File scanning: %d" % g_totalSkimed, end="\r")


def findName(filename, keywords, dir, regex, isIgnoreCase):
    global g_totalSkimed
    global g_count
    try:
        if regex:
            if regex.search(filename):
                g_count += 1
                #print("%03d--> %s%s" %(g_count,dir,filename))
                print("%03d--> %s" %(g_count,dir) + Fore.YELLOW + "%s"%(filename) + Fore.RESET)
        else:
            myfileName = filename.lower() if isIgnoreCase else filename
            mykeywords = keywords.lower() if isIgnoreCase else keywords

            if(myfileName.find(mykeywords) >= 0):
                g_count += 1
                #print("%03d--> %s%s" %(g_count,dir,filename))
                print("%03d--> %s" %(g_count,dir) + Fore.YELLOW + "%s"%(filename) + Fore.RESET)
    except:
        print("**** Exception occurs on file %s%s" %(dir, filename))

    g_totalSkimed += 1
    print("**** File scanning: %d" % g_totalSkimed, end="\r")



def findFileInDir(dir, keywords, fileTypes, regex=None, isIgnoreCase=False, findMode=0):
    if not dir.endswith("\\"):
        dir += "\\"

    try:
        for i in os.listdir(dir):
            if os.path.isdir(dir+i):
                if findMode == 1:
                    findName(i, keywords, dir, regex, isIgnoreCase)
                findFileInDir(dir+i, keywords, fileTypes, regex, isIgnoreCase, findMode)
            else:
                if findMode == 0:
                    findName(i, keywords, dir, regex, isIgnoreCase)
                elif findMode == 2:
                    extension = i[i.find('.')+1:]
                    if extension in fileTypes:
                        findContents(i, keywords, dir, regex, isIgnoreCase)
    except:
        pass


if __name__ == "__main__":

    if len(sys.argv) <= 1:
        print("**** findfile.py usage: ****")
        print("\tSyntax: findfile.py -k keyword [-d directory] [-r] [-c] [-m 0|1|2] [-t fileTypes]")
        print("\t-k: the keywords to search.")
        print("\t-d: the directory to search from. By default is current work directory")
        print("\t-r: use regular expression or not. By default is not use regex")
        print("\t-c: ignore case or not. By default is not ignore case")
        print("\t-m: mode to find:")
        print("\t    0: find file name. by default")
        print("\t    1: find folder name.")
        print("\t    2: find contents.")
        print("\t-t: file types to find contents. Only applicable for mode=2. If not given, the default types")
        print("\t    contains txt, cxx, c, hxx, h, sch, ja, xml, json, js, py, html, htm, css, def, log, syslog")

    else:
        dir="" #1
        keywords="" #2
        isRegEx = False
        isIgnoreCase = False

        findMode = 0 # 0: find file name, 1: find folder name, 2: find contents
        fileTypes = []

        curState = 0
        regex = None

        for arg in sys.argv:
            if arg == "-d" or arg == "-D":
                curState = 1 
                continue
            elif arg == "-k" or arg == "-K":
                curState = 2
                continue
            elif arg == "-r" or arg == "-R":
                isRegEx = True
                continue
            elif arg == "-c" or arg == "-C":
                isIgnoreCase = True
                continue
            elif arg == "-m" or arg == "-M":
                curState = 3
                continue
            elif arg == "-t" or arg == "-T":
                curState = 4
            else:
                if curState == 1:
                    dir = arg
                elif curState == 2:
                    keywords = arg
                elif curState == 3:
                    if arg == '1':
                        findMode = 1
                    elif arg == '2':
                        findMode = 2
                    else:
                        findMode = 0
                elif curState == 4:
                    fileTypes.append(arg)

        if not dir:
            dir = os.getcwd()
        if not fileTypes:
            fileTypes = ['txt', 'cxx', 'c', 'hxx', 'h', 'sch', 'ja', 'xml', 'json', 'js', 'py', 'html', 'htm', 'css', 'def', 'log', 'syslog']

        init(convert = True)

        print("**** findfile.py : ****")
        print("\t-k:", Fore.YELLOW, keywords, Fore.RESET, "[keyword]")
        print("\t-d:", Fore.YELLOW, dir, Fore.RESET, "[directory]")
        print("\t-r:", Fore.YELLOW, isRegEx, Fore.RESET, "[regex]")
        print("\t-c:", Fore.YELLOW, isIgnoreCase, Fore.RESET, "[ignore case]")
        print("\t-m:", Fore.YELLOW, findMode, Fore.RESET, "[mode. 0:file, 1:folder, 2:contents]")
        print("\t-t:", Fore.YELLOW, fileTypes, Fore.RESET, "[fileTypes only for mode=2]")

        if keywords=="":
            print("****", Fore.RED, "No keywords supplied.", Fore.RESET, "****")
        else:
            print("---- Start finding: ----")
            if isRegEx:
                flag = re.I if isIgnoreCase else 0
                regex = re.compile(keywords, flag)

            t0 = time.time()
            findFileInDir(dir, keywords, fileTypes, regex, isIgnoreCase, findMode)
            t1 = time.time()

            # seconds to HH:MM::SS
            m,s = divmod(t1-t0, 60)
            h,m = divmod(m, 60)

            print(Fore.MAGENTA,"                  [%d found. %d scanned. time elapse: %02d:%02d:%02d]" % (g_count, g_totalSkimed, h,m,s), Fore.RESET)
            print("--------------------------------------------------")










